import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Character from '#models/character'

export default class MangaCharacter extends BaseModel {
  public static table = 'Manga_Characters'
  public static primaryKey = 'manga_id'
  public incrementing = false

  @column()
  declare manga_id: number

  @column()
  declare character_id: number

  @column()
  declare role: string

  @belongsTo(() => Character, { foreignKey: 'character_id' })
  declare character: BelongsTo<typeof Character>
}
