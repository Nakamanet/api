import type { HttpContext } from '@adonisjs/core/http'
import Anime from '#models/anime/anime'

export default class AnimeController {
  async index({ request, response }: HttpContext) {
    const page  = request.input('page', 1)
    const limit = request.input('limit', 20)

    const anime = await Anime.query().paginate(page, limit)

    return response.ok(anime)
  }

  async show({ params, response }: HttpContext) {
    const anime = await Anime.findOrFail(params.id)
    return response.ok(anime)
  }
}
