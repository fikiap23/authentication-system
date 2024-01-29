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

const changeIsVerified = async (user_id: ObjectId) => {
  return await userModel.updateOne(
    { _id: user_id },
    { $set: { verified: true } }
  )
}

export default {
  createUser,
  getUserByEmail,
  saveToken,
  getTokenByUserId,
  changeIsVerified,
}
