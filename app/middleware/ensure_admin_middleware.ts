// app/middleware/ensure_admin_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  sub: string
  username: string
  avatar_url: string
  is_admin: boolean
}

export default class EnsureAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.header('authorization')?.replace('Bearer ', '')

    if (!token) {
      return ctx.response.unauthorized({ message: 'No token provided' })
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

      if (!payload.is_admin) {
        return ctx.response.forbidden({ message: 'Admin access required' })
      }

      return next()
    } catch {
      return ctx.response.unauthorized({ message: 'Invalid or expired token' })
    }
  }
}
