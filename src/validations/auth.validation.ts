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

export default { createUserValidation }
