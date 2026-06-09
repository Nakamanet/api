import type { HttpContext } from '@adonisjs/core/http'
import cache from '@adonisjs/cache/services/main'
import db from '@adonisjs/lucid/services/db'

export default class AnimeCharactersController {
  async index({ params, response }: HttpContext) {
    const castings = await cache.getOrSet({
      key: `anime:${params.id}:characters`,
      ttl: '30m',
      factory: async () => {
        const rows = await db
          .from('Anime_Castings as ac')
          .join('Characters as c', 'c.id', 'ac.character_id')
          .join('People as p', 'p.id', 'ac.person_id')
          .where('ac.anime_id', params.id)
          .orderByRaw(`
            CASE ac.character_role
              WHEN 'main'       THEN 1
              WHEN 'supporting' THEN 2
              WHEN 'recurring'  THEN 3
              WHEN 'cameo'      THEN 4
              ELSE 5
            END
          `)
          .select([
            'ac.anime_id',
            'ac.character_id',
            'ac.person_id',
            'ac.role',
            'ac.character_role',
            'c.name as c_name',
            'c.description as c_description',
            'c.image_url as c_image_url',
            'c.kitsu_id as c_kitsu_id',
            'p.name as p_name',
            'p.image_url as p_image_url',
            'p.description as p_description',
            'p.kitsu_id as p_kitsu_id',
          ])

        return rows.map((row) => ({
          animeId: row.anime_id,
          characterId: row.character_id,
          personId: row.person_id,
          role: row.character_role ?? row.role,
          character: {
            id: row.character_id,
            name: row.c_name,
            description: row.c_description,
            imageUrl: row.c_image_url,
            kitsuId: row.c_kitsu_id,
          },
          person: {
            id: row.person_id,
            name: row.p_name,
            imageUrl: row.p_image_url,
            description: row.p_description,
            kitsuId: row.p_kitsu_id,
          },
        }))
      },
    })

    return response.ok(castings)
  }
}
