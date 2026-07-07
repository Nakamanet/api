import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Person from '#models/person'

export default class MangaStaff extends BaseModel {
  public static table = 'Manga_Staff'
  public static primaryKey = 'manga_id'
  public incrementing = false

  @column()
  declare manga_id: number

  @column()
  declare person_id: number

  @column()
  declare role: string

  @belongsTo(() => Person, { foreignKey: 'person_id' })
  declare person: BelongsTo<typeof Person>
}
