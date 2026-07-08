import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Person extends BaseModel {
  public static table = 'People'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare image_url: string

  @column()
  declare description: string

  @column()
  declare kitsu_id: number
}
