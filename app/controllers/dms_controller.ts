import type { HttpContext } from '@adonisjs/core/http'
import { Message } from '#models/message'
import jwt from 'jsonwebtoken'

export default class DmsController {
  async index({ request, response }: HttpContext) {
    const token = request.header('authorization')?.replace('Bearer ', '')

    if (!token) {
      return response.unauthorized({ message: 'No token provided' })
    }

    let userId: string
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string }
      userId = payload.sub
    } catch {
      return response.unauthorized({ message: 'Invalid token' })
    }

    const rooms = await Message.aggregate([
      {
        $match: {
          room: { $regex: `^dm:(${userId}:|.*:${userId}$)` },
        },
      },
      { $sort: { created_at: -1 } },
      {
        $group: {
          _id: '$room',
          lastMessage: { $first: '$$ROOT' },
        },
      },
      { $sort: { 'lastMessage.created_at': -1 } },
    ])

    return response.ok(rooms)
  }
}
