import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category/category'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const categories = await Category.all()
    return response.ok(categories)
  }
}
