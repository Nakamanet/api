import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Anime extends BaseModel {
  public static table = 'Anime'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title_en: string

  @column()
  declare title_jp: string

  @column()
  declare synopsis: string
}
