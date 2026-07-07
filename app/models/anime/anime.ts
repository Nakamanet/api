import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Category from '#models/category/category'
import Genre from '#models/genre'

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

  @manyToMany(() => Category, {
    pivotTable: 'Anime_Categories',
    localKey: 'id',
    pivotForeignKey: 'anime_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
  })
  declare categories: ManyToMany<typeof Category>


  @manyToMany(() => Genre, {
    pivotTable: 'Anime_Genres',
    localKey: 'id',
    pivotForeignKey: 'anime_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'genre_id',
  })
  declare genres: ManyToMany<typeof Genre>
}
