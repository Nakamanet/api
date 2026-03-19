import type { HttpContext } from '@adonisjs/core/http'
import MangaCharacter from '#models/manga/manga_character'

export default class MangaCharactersController {
  async index({ params, response }: HttpContext) {
    const characters = await MangaCharacter.query()
      .where('manga_id', params.id)
      .preload('character')

    return response.ok(characters)
  }
}
