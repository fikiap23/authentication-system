import Joi from 'joi'
import UserType from '../types/user.type'

const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  })

  return schema.validate(payload)
}

const loginUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  return schema.validate(payload)
}

const refreshTokenValidation = (payload: UserType) => {
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  })

  return schema.validate(payload)
}

export default {
  createUserValidation,
  loginUserValidation,
  refreshTokenValidation,
}
