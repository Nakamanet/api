import type { HttpContext } from '@adonisjs/core/http'
import Anime from '#models/anime/anime'

export default class AnimeCategoriesController {
  async index({ params, response }: HttpContext) {
    const anime = await Anime.query()
      .where('id', params.anime_id)
      .preload('categories')
      .firstOrFail()

    return response.ok(anime.categories)
  }
}
