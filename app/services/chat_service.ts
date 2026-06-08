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

    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL, // your Next.js URL
        methods: ['GET', 'POST'],
      },
    })

    // auth middleware — runs before every connection
    this.io.use((socket, next) => {
      try {
        const token =
          socket.handshake.auth?.token ||
          socket.handshake.headers.authorization?.replace('Bearer ', '')

        if (!token) return next(new Error('No token'))

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any

        socket.data.user = {
          id:         String(payload.sub),
          username:   payload.username,
          avatar_url: payload.avatar_url ?? null,
        }

        next()
      } catch {
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

      // handle incoming message
      socket.on('message', async (content: string) => {
        if (!content?.trim()) return

        const message = await Message.create({
          user_id:    user.id,
          username:   user.username,
          avatar_url: user.avatar_url,
          content:    content.trim(),
        })

        // broadcast to everyone including sender
        this.io.emit('message', message)
      })

      socket.on('disconnect', () => {
        console.log(`${user.username} disconnected`)
      })
    })
  }
}
