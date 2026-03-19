import type { HttpContext } from '@adonisjs/core/http'
import Episode from '#models/episode'

export default class AnimeEpisodesController {
  async index({ params, request, response }: HttpContext) {
    const page  = request.input('page', 1)
    const limit = request.input('limit', 20)

    const episodes = await Episode.query()
      .where('anime_id', params.id)
      .orderBy('number', 'asc')
      .paginate(page, limit)

    return response.ok(episodes)
  }
}
