// app/controllers/channels_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import { Channel } from '#models/channel'

export default class ChannelsController {
  async index({ response }: HttpContext) {
    const channels = await Channel.find().sort({ group: 1, label: 1 }).lean()
    return response.ok(channels)
  }

  async store({ request, response, auth }: HttpContext) {
    const { room, label, group, icon } = request.only(['room', 'label', 'group', 'icon'])

    if (!room || !label || !group) {
      return response.badRequest({ message: 'room, label, and group are required' })
    }

    const existing = await Channel.findOne({ room })
    if (existing) {
      return response.conflict({ message: 'A channel with this room id already exists' })
    }

    const channel = await Channel.create({
      room,
      label,
      group,
      icon: icon ?? 'hash',
      created_by: String(auth.user!.id),
    })

    return response.created(channel)
  }

  async update({ params, request, response }: HttpContext) {
    const { label, group, icon } = request.only(['label', 'group', 'icon'])

    const channel = await Channel.findByIdAndUpdate(
      params.id,
      { label, group, icon },
      { new: true }
    )

    if (!channel) {
      return response.notFound({ message: 'Channel not found' })
    }

    return response.ok(channel)
  }

  async destroy({ params, response }: HttpContext) {
    const channel = await Channel.findById(params.id)

    if (!channel) {
      return response.notFound({ message: 'Channel not found' })
    }

    if (channel.room === 'general') {
      return response.badRequest({ message: 'Cannot delete the general channel' })
    }

    await Channel.findByIdAndDelete(params.id)

    return response.ok({ message: 'Channel deleted' })
  }
}
