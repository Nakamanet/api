import type { HttpContext } from '@adonisjs/core/http'
import Anime from '#models/anime'

export default class AnimeController {
  async index({ response }: HttpContext) {
    const anime = await Anime.all()
    return response.ok(anime)
  }

  async show({ params, response }: HttpContext) {
    const anime = await Anime.findOrFail(params.id)
    return response.ok(anime)
  }
}