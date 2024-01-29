import { ObjectId } from 'mongodb'

export default interface EmailTokenType {
  user_id: ObjectId
  token: string
  created_at: Date
  expires_at: Date
}
