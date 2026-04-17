import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Manga from '#models/manga/manga'

export default class MangaCategoriesController {
  async index({ params, response }: HttpContext) {
    const categories = await cache.getOrSet({
      key: `manga:${params.id}:categories`,
      ttl: '1h',
      factory: async () => {
        const manga = await Manga.query()
          .where('id', params.id)
          .preload('categories')
          .firstOrFail()

        return manga.categories
      },
    })

    return response.ok(categories)
  }
}
