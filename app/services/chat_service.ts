// app/services/chat_service.ts
import { Server, Socket } from 'socket.io'
import { createServer } from 'node:http'
import jwt from 'jsonwebtoken'
import { Message } from '#models/message'
import { Channel } from '#models/channel'
import mongoose from 'mongoose'

const DEFAULT_ROOM = 'general'
const MEMBER_HISTORY_LIMIT = 50
const GUEST_HISTORY_LIMIT = 20

async function isContentFlagged(text: string): Promise<boolean> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return false

  try {
    const res = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: text }),
    })

    if (res.ok) {
      const data: any = await res.json()
      if (data?.results?.[0]?.flagged) {
        return true
      }
    }
  } catch (err) {
    console.error('Chat moderation API error:', err)
  }

  return false
}

export class ChatService {
  private io!: Server

  async boot(httpServer: ReturnType<typeof createServer>) {
    await mongoose.connect(process.env.MONGO_URL!)
    console.log('MongoDB connected')

    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
      },
    })

    this.io.use(async (socket, next) => {
      try {
        const token =
          socket.handshake.auth?.token ||
          socket.handshake.headers.authorization?.replace('Bearer ', '')

        if (!token) {
          socket.data.user = null
          return next()
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET!, {
          algorithms: ['HS256'],
        }) as any

        socket.data.user = { id: String(payload.sub) }
        next()
      } catch (err) {
        console.error('Socket auth error:', err)
        next(new Error('Invalid token'))
      }
    })

    this.io.on('connection', (socket: Socket) => {
      const user = socket.data.user
      console.log(`${user?.id ?? 'guest'} connected`)

      let currentRoom: string | null = null

      socket.on('chat:join', async (room: string) => {
        if (!room || typeof room !== 'string') return
        if (!user && room !== DEFAULT_ROOM && !(await Channel.exists({ room }))) return

        if (currentRoom) {
          socket.leave(currentRoom)
        }

        socket.join(room)
        currentRoom = room

        const history = await Message.find({ room })
          .sort({ created_at: -1 })
          .limit(user ? MEMBER_HISTORY_LIMIT : GUEST_HISTORY_LIMIT)
          .lean()

        socket.emit('history', history.reverse())
      })

      socket.on(
        'chat:message',
        async (data: { room: string; content: string; username: string; avatar_url: string | null }) => {
          console.log('message received:', data)
          if (!user || !data.content?.trim() || !data.room) return

          const isHidden = await isContentFlagged(data.content.trim())

          const message = await Message.create({
            room: data.room,
            user_id: user.id,
            username: data.username,
            avatar_url: data.avatar_url ?? null,
            content: data.content.trim(),
            is_hidden: isHidden,
          })

          this.io.to(data.room).emit('chat:message', message)
        }
      )

      socket.on('disconnect', () => {
        console.log(`${user?.id ?? 'guest'} disconnected`)
      })
    })
  }
}
