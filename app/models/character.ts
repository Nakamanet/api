import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Character extends BaseModel {
  public static table = 'Characters'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare image_url: string

  @column()
  declare kitsu_id: number
}
