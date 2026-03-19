import type { HttpContext } from '@adonisjs/core/http'
import AnimeCasting from '#models/anime/anime_casting'

export default class AnimeCharactersController {
  async index({ params, response }: HttpContext) {
    const castings = await AnimeCasting.query()
      .where('anime_id', params.id)
      .preload('character')
      .preload('person')

    return response.ok(castings)
  }
}
