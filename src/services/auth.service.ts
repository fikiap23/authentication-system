import UserType from '../types/user.type'
import userModel from '../models/user.model'

const createUser = async (payload: UserType) => {
  return await userModel.create(payload)
}

const getUserByEmail = async (email: String) => {
  return await userModel.findOne({ email: email })
}

export default { createUser, getUserByEmail }
