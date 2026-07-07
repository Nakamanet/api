// app/services/chat_service.ts
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import jwt from 'jsonwebtoken'
import { Message } from '#models/message'
import mongoose from 'mongoose'

export class ChatService {
  private io!: Server

  async boot(httpServer: ReturnType<typeof createServer>) {
    // connect mongoose
    await mongoose.connect(process.env.MONGO_URL!)
    console.log('MongoDB connected')

    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL, // your Next.js URL
        methods: ['GET', 'POST'],
      },
    })
    console.log("user?",this.io)


   this.io.use(async (socket, next) => {
    try {
        const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers.authorization?.replace('Bearer ', '')

        if (!token) return next(new Error('No token'))

        const payload = jwt.verify(token, process.env.JWT_SECRET!, {
        algorithms: ['HS256']
        }) as any

        // just store the user_id from the token
        socket.data.user = {
        id: String(payload.sub),
        }

        next()
    } catch (err) {
        console.error('Socket auth error:', err)
        next(new Error('Invalid token'))
    }
    })

    this.io.on('connection', async (socket) => {
      const user = socket.data.user
      console.log(`${user.username} connected`)

      // send last 50 messages on connect
      const history = await Message.find()
        .sort({ created_at: -1 })
        .limit(50)
        .lean()

      socket.emit('history', history.reverse())

     socket.on('chat:message', async (data: { content: string, username: string, avatar_url: string | null }) => {
        console.log('message received:', data)
        if (!data.content?.trim()) return

        const message = await Message.create({
            user_id:    socket.data.user.id,
            username:   data.username,
            avatar_url: data.avatar_url ?? null,
            content:    data.content.trim(),
        })

        this.io.emit('chat:message', message)
        })

      socket.on('disconnect', () => {
        console.log(`${user.username} disconnected`)
      })
    })
  }
}
