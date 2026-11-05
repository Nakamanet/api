import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import { getPopularity, orderByPopularity, popularityCacheKey } from '#services/popularity_service'
import Manga from '#models/manga/manga'

function parseSlugs(value: unknown): string[] {
  if (!value) return []
  return [...new Set(String(value).split(',').map((slug) => slug.trim()).filter(Boolean))].sort()
}

export default class MangaController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const includeGenres = parseSlugs(request.input('genre'))
    const excludeGenres = parseSlugs(request.input('excludeGenres'))
    const search = request.input('search')

    const popularity = await getPopularity('manga')

    const manga = await cache.getOrSet({
      key: `manga:list:v2:pop${popularityCacheKey(popularity)}:p${page}:l${limit}:g${includeGenres.join('-') || 'all'}:xg${excludeGenres.join('-') || 'none'}:s${search ?? 'none'}`,
      ttl: '5m',
      factory: async () => {
        const query = Manga.query()

        for (const slug of includeGenres) {
          query.whereHas('genres', (genresQuery) => {
            genresQuery.where('slug', slug)
          })
        }

        if (excludeGenres.length > 0) {
          query.whereDoesntHave('genres', (genresQuery) => {
            genresQuery.whereIn('slug', excludeGenres)
          })
        }

        if (search) {
          query.where((builder) => {
            builder
              .whereILike('title_en', `%${search}%`)
              .orWhereILike('title_jp', `%${search}%`)
          })
        }

        return orderByPopularity(query.preload('genres'), popularity).paginate(page, limit)
      },
    })

    return response.ok(manga)
  }

  async show({ params, response }: HttpContext) {
    const identifier = params.id

    const manga = await cache.getOrSet({
      key: `manga:show:v2:${identifier}`,
      ttl: '10m',
      factory: async () => {
        return isNaN(Number(identifier))
          ? await Manga.query().where('slug', identifier).preload('genres').firstOrFail()
          : await Manga.query().where('id', identifier).preload('genres').firstOrFail()
      },
    })

    return response.ok(manga)
  }
}