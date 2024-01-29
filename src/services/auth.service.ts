import UserType from '../types/user.type'
import userModel from '../models/user.model'
import tokenModel from '../models/token.model'
import EmailTokenType from '../types/emailToken.type'

const createUser = async (payload: UserType) => {
  return await userModel.create(payload)
}

const getUserByEmail = async (email: String) => {
  return await userModel.findOne({ email: email })
}

const saveToken = async (payload: EmailTokenType) => {
  return await tokenModel.create(payload)
}

export default { createUser, getUserByEmail, saveToken }
