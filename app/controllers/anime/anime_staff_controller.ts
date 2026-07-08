import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import AnimeCasting from '#models/anime/anime_casting'

export default class AnimeStaffController {
  async index({ params, response }: HttpContext) {
    const staff = await cache.getOrSet({
      key: `anime:${params.id}:staff`,
      ttl: '30m',
      factory: async () => {
        return AnimeCasting.query()
          .where('anime_id', params.id)
          .preload('person')
          .whereNotNull('person_id')
      },
    })

    return response.ok(staff)
  }
}
