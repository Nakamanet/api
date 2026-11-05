import { createHash } from 'node:crypto'
import env from '#start/env'
import cache from '@adonisjs/cache/services/main'
import logger from '@adonisjs/core/services/logger'
import type { LucidModel, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

type CatalogType = 'anime' | 'manga'

export type Popularity = { id: number; count: number }[]

export async function getPopularity(type: CatalogType): Promise<Popularity> {
  const baseUrl = env.get('LARAVEL_API_URL')
  if (!baseUrl) return []

  try {
    return await cache.getOrSet({
      key: `popularity:v2:${type}`,
      ttl: '5m',
      grace: '24h',
      graceBackoff: '30s',
      factory: async () => {
        const response = await fetch(`${baseUrl}/library/popularity/${type}`, {
          signal: AbortSignal.timeout(5000),
        })
        if (!response.ok) throw new Error(`Popularity request failed with ${response.status}`)

        const rows = (await response.json()) as { id: number; count: number }[]
        return rows
          .map((row) => ({ id: Number(row.id), count: Number(row.count) }))
          .filter((row) => Number.isInteger(row.id) && Number.isInteger(row.count))
      },
    })
  } catch (error) {
    logger.warn({ err: error }, `Popularity unavailable for ${type}`)
    return []
  }
}

export function popularityCacheKey(popularity: Popularity): string {
  const signature = popularity.map((row) => `${row.id}:${row.count}`).join(',')
  return createHash('md5').update(signature).digest('hex').slice(0, 12)
}

export function orderByPopularity<Model extends LucidModel>(
  query: ModelQueryBuilderContract<Model>,
  popularity: Popularity
) {
  if (popularity.length > 0) {
    const cases = popularity.map(() => 'when ? then ?').join(' ')
    const bindings = popularity.flatMap((row) => [row.id, row.count])
    query.orderByRaw(`case id ${cases} else 0 end desc`, bindings)
  }

  return query
    .orderByRaw(
      "nullif(regexp_replace(lower(coalesce(title_en, title_jp, '')), '^[^[:alnum:]]+', ''), '') asc nulls last"
    )
    .orderBy('id', 'asc')
}
