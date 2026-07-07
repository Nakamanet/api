import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Company from '#models/company'

export default class AnimeProduction extends BaseModel {
  public static table = 'Anime_Productions'
  public static primaryKey = 'anime_id'
  public incrementing = false

  @column()
  declare anime_id: number

  @column()
  declare company_id: number

  @column()
  declare role: string

  @belongsTo(() => Company, { foreignKey: 'company_id' })
  declare company: BelongsTo<typeof Company>
}
