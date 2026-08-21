// app/models/channel.ts
import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema({
  room: { type: String, required: true, unique: true }, // e.g. 'general', 'one-piece'
  label: { type: String, required: true },               // display name, e.g. 'One Piece'
  group: { type: String, required: true },               // e.g. 'Général', 'Genres', 'Œuvres'
  icon: { type: String, default: 'hash' },                // icon key, frontend maps to lucide icon
  created_by: { type: String, required: true },           // admin user_id who created it
  created_at: { type: Date, default: Date.now },
})

export const Channel = mongoose.model('Channel', channelSchema)