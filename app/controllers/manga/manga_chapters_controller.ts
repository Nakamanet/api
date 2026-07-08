import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Chapter from '#models/chapter'

export default class MangaChaptersController {
  async index({ params, request, response }: HttpContext) {
    const page  = request.input('page', 1)
    const limit = request.input('limit', 20)

    const chapters = await cache.getOrSet({
      key: `manga:${params.id}:chapters:p${page}:l${limit}`,
      ttl: '5m',
      factory: async () => {
        return Chapter.query()
          .where('manga_id', params.id)
          .orderBy('number', 'asc')
          .paginate(page, limit)
      },
    })

    return response.ok(chapters)
  }
}
