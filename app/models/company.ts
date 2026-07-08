import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Company extends BaseModel {
  public static table = 'Companies'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare country: string

  @column()
  declare type: string

  @column()
  declare kitsu_id: number
}
