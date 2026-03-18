import type { HttpContext } from '@adonisjs/core/http'
import Anime from '#models/anime/anime'
import Genre from '#models/genre'

export default class AnimeController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const genreSlug = request.input('genre')

    const query = Anime.query()

    if (genreSlug) {
      const genre = await Genre.findByOrFail('slug', genreSlug)
      query.whereHas('genres', (genresQuery) => {
        genresQuery.where('id', genre.id)
      })
    }

    const anime = await query.paginate(page, limit)

    return response.ok(anime)
  }

  async show({ params, response }: HttpContext) {
    const identifier = params.id
    const anime = isNaN(Number(identifier))
      ? await Anime.query().where('slug', identifier).firstOrFail()
      : await Anime.findOrFail(identifier)
    return response.ok(anime)
  }
}
