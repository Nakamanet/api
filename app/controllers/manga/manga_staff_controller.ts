import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import MangaStaff from '#models/manga/manga_staff'

export default class MangaStaffController {
  async index({ params, response }: HttpContext) {
    const staff = await cache.getOrSet({
      key: `manga:${params.id}:staff`,
      ttl: '30m',
      factory: async () => {
        return MangaStaff.query()
          .where('manga_id', params.id)
          .preload('person')
      },
    })

    return response.ok(staff)
  }
}
