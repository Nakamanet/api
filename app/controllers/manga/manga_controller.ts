import type { HttpContext } from '@adonisjs/core/http'
import Manga from '#models/manga/manga'
import Genre from '#models/genre'

export default class MangaController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const genreSlug = request.input('genre')

    const query = Manga.query()

    if (genreSlug) {
      const genre = await Genre.findByOrFail('slug', genreSlug)
      query.whereHas('genres', (genresQuery) => {
        genresQuery.where('id', genre.id)
      })
    }

    const manga = await query.paginate(page, limit)
    return response.ok(manga)
  }

  async show({ params, response }: HttpContext) {
    const identifier = params.id
    const manga = isNaN(Number(identifier))
      ? await Manga.query().where('slug', identifier).firstOrFail()
      : await Manga.findOrFail(identifier)
    return response.ok(manga)
  }
}
