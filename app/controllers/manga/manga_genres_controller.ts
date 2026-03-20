import type { HttpContext } from '@adonisjs/core/http'
import Manga from '#models/manga/manga'

export default class MangaGenresController {
  async index({ params, response }: HttpContext) {
    const manga = await Manga.query()
      .where('id', params.id)
      .preload('genres')
      .firstOrFail()

    return response.ok(manga.genres)
  }
}
