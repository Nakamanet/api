import type { HttpContext } from '@adonisjs/core/http'
import Anime from '#models/anime/anime'

export default class AnimeGenresController {
  async index({ params, response }: HttpContext) {
    const anime = await Anime.query()
      .where('id', params.anime_id)
      .preload('genres')
      .firstOrFail()

    return response.ok(anime.genres)
  }
}

