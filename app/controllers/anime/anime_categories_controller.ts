import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Anime from '#models/anime/anime'

export default class AnimeCategoriesController {
  async index({ params, response }: HttpContext) {
    const categories = await cache.getOrSet({
      key: `anime:${params.id}:categories`,
      ttl: '1h',
      factory: async () => {
        const anime = await Anime.query()
          .where('id', params.id)
          .preload('categories')
          .firstOrFail()

        return anime.categories
      },
    })

    return response.ok(categories)
  }
}
