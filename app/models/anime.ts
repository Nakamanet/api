import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Anime extends BaseModel {
  public static table = 'Anime'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare title_en: string

  @column()
  declare title_jp: string

  @column()
  declare synopsis: string

  @column()
  declare type: string

  @column()
  declare subtype: string

  @column()
  declare status: string

  @column.date()
  declare start_date: DateTime

  @column.date()
  declare end_date: DateTime

  @column()
  declare nsfw: boolean

  @column()
  declare poster_image: string

  @column()
  declare cover_image: string

  @column()
  declare age_rating: string

  @column()
  declare episode_count: number

  @column()
  declare episode_length: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
