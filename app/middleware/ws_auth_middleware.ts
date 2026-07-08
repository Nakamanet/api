// app/middleware/ws_auth_middleware.ts
import jwt from 'jsonwebtoken'
import type { Socket } from 'socket.io'

export interface AuthPayload {
  sub: string // user id
  username: string
  avatar_url: string
}

export function wsAuth(socket: Socket, next: (err?: Error) => void) {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace('Bearer ', '')

    if (!token) {
      return next(new Error('No token provided'))
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload

    // attach user info to socket for use in handlers
    socket.data.user = {
      id: payload.sub,
      username: payload.username,
      avatar_url: payload.avatar_url,
    }

    next()
  } catch {
    next(new Error('Invalid or expired token'))
  }
}
