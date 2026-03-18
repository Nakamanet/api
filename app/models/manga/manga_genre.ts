import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MangaGenre extends BaseModel {
  public static table = 'Manga_Genres'
  public static primaryKey = 'manga_id'
  public incrementing = false

  @column({ isPrimary: true })
  declare manga_id: number

  @column({ isPrimary: true })
  declare genre_id: number
}
