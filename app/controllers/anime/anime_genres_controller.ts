import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Anime from '#models/anime/anime'

export default class AnimeGenresController {
  async index({ params, response }: HttpContext) {
    const genres = await cache.getOrSet({
      key: `anime:${params.id}:genres`,
      ttl: '1h',
      factory: async () => {
        const anime = await Anime.query()
          .where('id', params.id)
          .preload('genres')
          .firstOrFail()

        return anime.genres
      },
    })

    return response.ok(genres)
  }
}