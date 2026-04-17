import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import MangaCharacter from '#models/manga/manga_character'

export default class MangaCharactersController {
  async index({ params, response }: HttpContext) {
    const characters = await cache.getOrSet({
      key: `manga:${params.id}:characters`,
      ttl: '30m',
      factory: async () => {
        return MangaCharacter.query()
          .where('manga_id', params.id)
          .preload('character')
      },
    })

    return response.ok(characters)
  }
}
