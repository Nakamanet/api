import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Character from '#models/character'
import Person from '#models/person'

export default class AnimeCasting extends BaseModel {
  public static table = 'Anime_Castings'
  public static primaryKey = 'anime_id'
  public incrementing = false

  @column()
  declare anime_id: number

  @column()
  declare character_id: number

  @column()
  declare person_id: number

  @column()
  declare role: string

  @belongsTo(() => Character, { foreignKey: 'character_id' })
  declare character: BelongsTo<typeof Character>

  @belongsTo(() => Person, { foreignKey: 'person_id' })
  declare person: BelongsTo<typeof Person>
}
