import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import AnimeProduction from '#models/anime/anime_production'

export default class AnimeProductionsController {
  async index({ params, response }: HttpContext) {
    const productions = await cache.getOrSet({
      key: `anime:${params.id}:productions`,
      ttl: '30m',
      factory: async () => {
        return AnimeProduction.query()
          .where('anime_id', params.id)
          .preload('company')
      },
    })

    return response.ok(productions)
  }
}