import { Request, Response } from 'express'
import authService from '../services/auth.service'
import { logger } from '../utils/logger'
import authValidation from '../validations/auth.validation'
import { hashPassword } from '../utils/hashing'

const registerUser = async (req: Request, res: Response) => {
  const { error, value } = authValidation.createUserValidation(req.body)
  if (error) {
    logger.error('ERR: auth - register = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    })
  }

  try {
    value.email = value.email.toLowerCase()
    value.password = await hashPassword(value.password)

    const user = await authService.getUserByEmail(value.email)
    if (user) {
      return res.status(409).send({
        status: false,
        statusCode: 409,
        message: 'Email already exist',
      })
    }

    await authService.createUser(value)

    logger.info('Success register user')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Register user success',
    })
  } catch (error) {
    logger.error('ERR: auth - register = ', error)

    res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export default { registerUser }
