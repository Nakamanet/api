import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AnimeCategory extends BaseModel {
  public static table = 'Anime_Categories'
  public static primaryKey = 'anime_id'
  public incrementing = false

  @column({ isPrimary: true })
  declare anime_id: number

  @column({ isPrimary: true })
  declare category_id: number
}
