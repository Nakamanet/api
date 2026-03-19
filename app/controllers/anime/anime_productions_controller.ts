import type { HttpContext } from '@adonisjs/core/http'
import AnimeProduction from '#models/anime/anime_production'

export default class AnimeProductionsController {
  async index({ params, response }: HttpContext) {
    const productions = await AnimeProduction.query()
      .where('anime_id', params.id)
      .preload('company')

    return response.ok(productions)
  }
}
