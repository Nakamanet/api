import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Category from '#models/category/category'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const categories = await cache.getOrSet({
      key: 'categories:list',
      ttl: '1h',
      factory: async () => {
        return Category.all()
      },
    })

    return response.ok(categories)
  }
}
