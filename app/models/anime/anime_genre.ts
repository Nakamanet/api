import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AnimeGenre extends BaseModel {
  public static table = 'Anime_Genres'
  public static primaryKey = 'anime_id'
  public incrementing = false

  @column({ isPrimary: true })
  declare anime_id: number

  @column({ isPrimary: true })
  declare genre_id: number
}
