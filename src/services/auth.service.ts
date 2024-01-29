import UserType from '../types/user.type'
import userModel from '../models/user.model'
import tokenModel from '../models/token.model'
import EmailTokenType from '../types/emailToken.type'
import { ObjectId } from 'mongodb'

const createUser = async (payload: UserType) => {
  return await userModel.create(payload)
}

const getUserByEmail = async (email: String) => {
  return await userModel.findOne({ email: email })
}

const saveToken = async (payload: EmailTokenType) => {
  return await tokenModel.create(payload)
}

const getTokenByUserId = async (user_id: ObjectId) => {
  return await tokenModel.findOne({ user_id: user_id })
}

const saveResetToken = async (payload: EmailTokenType) => {
  const filter = { user_id: payload.user_id }
  const update = {
    $set: {
      token: payload.token,
      expires_at: payload.expires_at,
    },
  }

  // Mencari dan memperbarui dokumen yang sesuai atau membuat dokumen baru jika tidak ditemukan
  const options = { upsert: true, new: true }

  return await tokenModel.findOneAndUpdate(filter, update, options).exec()
}

const deleteToken = async (user_id: ObjectId) => {
  return await tokenModel.deleteOne({ user_id: user_id })
}

const changeIsVerified = async (user_id: ObjectId) => {
  return await userModel.updateOne(
    { _id: user_id },
    { $set: { verified: true } }
  )
}

const resetPassword = async (user_id: ObjectId, password: string) => {
  return await userModel.updateOne({ _id: user_id }, { $set: { password } })
}

export default {
  createUser,
  getUserByEmail,
  saveToken,
  getTokenByUserId,
  changeIsVerified,
  saveResetToken,
  resetPassword,
  deleteToken,
}
