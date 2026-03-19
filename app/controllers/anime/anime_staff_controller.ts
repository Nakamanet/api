import type { HttpContext } from '@adonisjs/core/http'
import AnimeCasting from '#models/anime/anime_casting'

export default class AnimeStaffController {
  async index({ params, response }: HttpContext) {
    const staff = await AnimeCasting.query()
      .where('anime_id', params.id)
      .preload('person')
      .whereNotNull('person_id')

    return response.ok(staff)
  }
}
