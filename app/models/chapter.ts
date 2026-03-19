import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Manga from '#models/manga/manga'

export default class Chapter extends BaseModel {
  public static table = 'Chapters'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare manga_id: number

  @column()
  declare number: number

  @column()
  declare volume_number: number

  @column()
  declare title: string

  @column.date()
  declare release_date: DateTime

  @belongsTo(() => Manga, { foreignKey: 'manga_id' })
  declare manga: BelongsTo<typeof Manga>
}
