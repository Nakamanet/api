import type { HttpContext } from '@adonisjs/core/http'
import Manga from '#models/manga'

export default class AnimeController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page',1);
    const limit = request.input('limit',20);    
    
    const manga = await Manga.query().paginate(page,limit)
    return response.ok(manga)
  }

  async show({ params, response }: HttpContext) {
    const manga = await Manga.findOrFail(params.id)
    return response.ok(manga)
  }
}
