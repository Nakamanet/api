// app/models/message.ts
import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  room:       { type: String, required: true, index: true },
  user_id:    { type: String, required: true },
  username:   { type: String, required: true },
  avatar_url: { type: String, default: null },
  content:    { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

messageSchema.index({ room: 1, created_at: -1 })

export const Message = mongoose.model('Message', messageSchema)
