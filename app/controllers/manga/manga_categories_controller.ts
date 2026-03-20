import type { HttpContext } from '@adonisjs/core/http'
import Manga from '#models/manga/manga'

export default class MangaCategoriesController {
  async index({ params, response }: HttpContext) {
    const manga = await Manga.query()
      .where('id', params.id)
      .preload('categories')
      .firstOrFail()

    return response.ok(manga.categories)
  }
}
