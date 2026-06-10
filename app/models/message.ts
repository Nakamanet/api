// app/models/message.ts
import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  user_id:    { type: String, required: true },
  username:   { type: String, required: true },
  avatar_url: { type: String, default: null },
  content:    { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

export const Message = mongoose.model('Message', messageSchema)
