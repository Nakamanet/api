import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Manga from '#models/manga/manga'
import Genre from '#models/genre'

export default class MangaController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const genreSlug = request.input('genre')
    const search = request.input('search')

    const manga = await cache.getOrSet({
      key: `manga:list:p${page}:l${limit}:g${genreSlug ?? 'all'}:s${search ?? 'none'}`,
      ttl: '5m',
      factory: async () => {
        const query = Manga.query()

        if (genreSlug) {
          const genre = await Genre.findByOrFail('slug', genreSlug)
          query.whereHas('genres', (genresQuery) => {
            genresQuery.where('id', genre.id)
          })
        }

        if (search) {
          query.where((builder) => {
            builder
              .whereILike('title_en', `%${search}%`)
              .orWhereILike('title_jp', `%${search}%`)
          })
        }

        return query.orderBy('id', 'asc').paginate(page, limit)
      },
    })

    return response.ok(manga)
  }

  async show({ params, response }: HttpContext) {
    const identifier = params.id

    const manga = await cache.getOrSet({
      key: `manga:show:${identifier}`,
      ttl: '10m',
      factory: async () => {
        return isNaN(Number(identifier))
          ? await Manga.query().where('slug', identifier).firstOrFail()
          : await Manga.findOrFail(identifier)
      },
    })

    return response.ok(manga)
  }
}