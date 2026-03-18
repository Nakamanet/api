import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MangaCategory extends BaseModel {
  public static table = 'Manga_Categories'
  public static primaryKey = 'manga_id'
  public incrementing = false

  @column({ isPrimary: true })
  declare manga_id: number

  @column({ isPrimary: true })
  declare category_id: number
}
