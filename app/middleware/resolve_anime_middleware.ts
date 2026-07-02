import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Anime from '#models/anime/anime'

/**
 * Normalizes the `:id` route param to a numeric Anime id.
 *
 * The public API accepts both a numeric id and a slug. Sub-resource controllers
 * query foreign keys directly (`where('anime_id', params.id)`), which fails when
 * a slug is provided. Resolving the param here keeps those controllers working
 * with either a slug or an id, and turns an unknown slug into a clean 404
 * instead of a database error.
 */
export default class ResolveAnimeMiddleware {
  async handle({ params }: HttpContext, next: NextFn) {
    const identifier = params.id

    if (isNaN(Number(identifier))) {
      const anime = await Anime.query().where('slug', identifier).firstOrFail()
      params.id = anime.id
    }

    return next()
  }
}
