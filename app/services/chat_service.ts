// app/services/chat_service.ts
import { Server, Socket } from 'socket.io'
import { createServer } from 'node:http'
import jwt from 'jsonwebtoken'
import { Message } from '#models/message'
import mongoose from 'mongoose'

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

        if (!token) return next(new Error('No token'))

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
      console.log(`${user.id} connected`)

      let currentRoom: string | null = null

      socket.on('chat:join', async (room: string) => {
        if (!room || typeof room !== 'string') return

        if (currentRoom) {
          socket.leave(currentRoom)
        }

        socket.join(room)
        currentRoom = room

        const history = await Message.find({ room })
          .sort({ created_at: -1 })
          .limit(50)
          .lean()

        socket.emit('history', history.reverse())
      })

      socket.on(
        'chat:message',
        async (data: { room: string; content: string; username: string; avatar_url: string | null }) => {
          console.log('message received:', data)
          if (!data.content?.trim() || !data.room) return

          const message = await Message.create({
            room: data.room,
            user_id: user.id,
            username: data.username,
            avatar_url: data.avatar_url ?? null,
            content: data.content.trim(),
          })

          this.io.to(data.room).emit('chat:message', message)
        }
      )

      socket.on('disconnect', () => {
        console.log(`${user.id} disconnected`)
      })
    })
  }
}
