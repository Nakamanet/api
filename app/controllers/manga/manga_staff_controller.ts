import type { HttpContext } from '@adonisjs/core/http'
import MangaStaff from '#models/manga/manga_staff'

export default class MangaStaffController {
  async index({ params, response }: HttpContext) {
    const staff = await MangaStaff.query()
      .where('manga_id', params.id)
      .preload('person')

    return response.ok(staff)
  }
}
