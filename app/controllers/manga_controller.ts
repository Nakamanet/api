import type { HttpContext } from '@adonisjs/core/http'
import Manga from '#models/manga'

export default class AnimeController {
  async index({ response }: HttpContext) {
    const manga = await Manga.all()
    return response.ok(manga)
  }

  async show({ params, response }: HttpContext) {
    const manga = await Manga.findOrFail(params.id)
    return response.ok(manga)
  }
}
