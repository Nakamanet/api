import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Manga from '#models/manga/manga'

/**
 * Normalizes the `:id` route param to a numeric Manga id.
 *
 * The public API accepts both a numeric id and a slug (e.g. `hajime-no-ippo`).
 * Sub-resource controllers query foreign keys directly (`where('manga_id', params.id)`),
 * which fails when a slug is provided. Resolving the param here keeps those
 * controllers working with either a slug or an id, and turns an unknown slug
 * into a clean 404 instead of a database error.
 */
export default class ResolveMangaMiddleware {
  async handle({ params }: HttpContext, next: NextFn) {
    const identifier = params.id

    if (isNaN(Number(identifier))) {
      const manga = await Manga.query().where('slug', identifier).firstOrFail()
      params.id = manga.id
    }

    return next()
  }
}
