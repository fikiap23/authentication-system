import mongoose, { Schema } from 'mongoose'

const tokenSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  expires_at: {
    type: Date,
  },
})

const tokenModel = mongoose.model('token', tokenSchema)

export default tokenModel
