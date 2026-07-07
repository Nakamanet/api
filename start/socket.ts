// start/socket.ts
import { ChatService } from '#services/chat_service'
import server from '@adonisjs/core/services/server'
import app from '@adonisjs/core/services/app'
import type { Server as HttpServer } from 'node:http'

app.ready(async () => {
  const httpServer = server.getNodeServer() as HttpServer

  if (!httpServer) {
    throw new Error('HTTP server not available')
  }

  const chat = new ChatService()
  await chat.boot(httpServer)
})
