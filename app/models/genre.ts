import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Genre extends BaseModel {
  public static table = 'Genres'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string
}
