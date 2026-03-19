import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Anime from '#models/anime/anime'

export default class Episode extends BaseModel {
  public static table = 'Episodes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare anime_id: number

  @column()
  declare number: number

  @column()
  declare title: string

  @column.date()
  declare airdate: DateTime

  @column()
  declare length: number

  @column()
  declare thumbnail_url: string

  @belongsTo(() => Anime, { foreignKey: 'anime_id' })
  declare anime: BelongsTo<typeof Anime>
}
