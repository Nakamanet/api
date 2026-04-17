import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import Manga from '#models/manga/manga'

export default class MangaGenresController {
  async index({ params, response }: HttpContext) {
    const genres = await cache.getOrSet({
      key: `manga:${params.id}:genres`,
      ttl: '1h',
      factory: async () => {
        const manga = await Manga.query()
          .where('id', params.id)
          .preload('genres')
          .firstOrFail()

        return manga.genres
      },
    })

    return response.ok(genres)
  }
}
