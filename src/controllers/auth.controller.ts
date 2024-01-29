import { Request, Response } from 'express'
import authService from '../services/auth.service'
import { logger } from '../utils/logger'
import sendResponseApi from '../utils/sendResponseApi'
import authValidation from '../validations/auth.validation'
import { comparePassword, hashPassword } from '../utils/hashing'
import { signJWT } from '../utils/jwt'

const registerUser = async (req: Request, res: Response) => {
  const { error, value } = authValidation.createUserValidation(req.body)
  if (error) {
    logger.error('ERR: auth - register = ', error.details[0].message)
    return sendResponseApi({
      res,
      statusCode: 400,
      message: error.details[0].message,
    })
  }

  try {
    value.email = value.email.toLowerCase()
    value.password = await hashPassword(value.password)

    const user = await authService.getUserByEmail(value.email)
    if (user) {
      return sendResponseApi({
        res,
        statusCode: 409,
        message: 'Email already exists',
      })
    }

    await authService.createUser(value)

    logger.info('Success register user')
    return sendResponseApi({
      res,
      statusCode: 201,
      message: 'Success register user',
    })
  } catch (error) {
    logger.error('ERR: auth - register = ', error)

    return sendResponseApi({
      res,
      statusCode: 500,
      message: 'Internal server error',
    })
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { error, value } = authValidation.loginUserValidation(req.body)
  if (error) {
    logger.error('ERR: auth - login = ', error.details[0].message)
    return sendResponseApi({
      res,
      statusCode: 400,
      message: error.details[0].message,
    })
  }
  try {
    value.email = value.email.toLowerCase()
    const user = await authService.getUserByEmail(value.email)
    if (!user) {
      return sendResponseApi({
        res,
        statusCode: 404,
        message: 'Email not found',
      })
    }
    const isPasswordMatch = await comparePassword(value.password, user.password)
    if (!isPasswordMatch) {
      return sendResponseApi({
        res,
        statusCode: 401,
        message: 'Wrong password',
      })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })

    logger.info('Success login user')
    return sendResponseApi({
      res,
      statusCode: 200,
      message: 'Success login user',
      data: {
        accessToken,
        refreshToken,
      },
    })
  } catch (error) {
    logger.error('ERR: auth - login = ', error)
    console.log(error)
    return sendResponseApi({
      res,
      statusCode: 500,
      message: 'Internal server error',
    })
  }
}

export default { registerUser, loginUser }
