import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import AnimeCasting from '#models/anime/anime_casting'

export default class AnimeCharactersController {
  async index({ params, response }: HttpContext) {
    const castings = await cache.getOrSet({
      key: `anime:${params.id}:characters`,
      ttl: '30m',
      factory: async () => {
        return AnimeCasting.query()
          .where('anime_id', params.id)
          .preload('character')
          .preload('person')
      },
    })

    return response.ok(castings)
  }
}
