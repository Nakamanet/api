import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Genre from '#models/genre'

export default class GenresController {
  async index({ response }: HttpContext) {
    const genres = await cache.getOrSet({
      key: 'genres:list',
      ttl: '1h',
      factory: async () => {
        return Genre.all()
      },
    })

    return response.ok(genres)
  }
}
