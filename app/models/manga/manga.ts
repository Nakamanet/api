import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category/category'
import Genre from '#models/genre'

export default class Manga extends BaseModel {
  public static table = 'Manga'

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
  declare status: string

  @column()
  declare volume_count: number

  @column()
  declare chapter_count: number

  @column.date()
  declare start_date: DateTime

  @column.date()
  declare end_date: DateTime

  @column()
  declare poster_image: string

  @column()
  declare cover_image: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @manyToMany(() => Category, {
    pivotTable: 'Manga_Categories',
    localKey: 'id',
    pivotForeignKey: 'manga_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
  })
  declare categories: ManyToMany<typeof Category>

  @manyToMany(() => Genre, {
    pivotTable: 'Manga_Genres',
    localKey: 'id',
    pivotForeignKey: 'manga_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'genre_id',
  })
  declare genres: ManyToMany<typeof Genre>
}
