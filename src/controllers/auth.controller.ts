import { Request, Response } from 'express'
import authService from '../services/auth.service'
import { logger } from '../utils/logger'
import sendResponseApi from '../utils/sendResponseApi'
import authValidation from '../validations/auth.validation'
import { comparePassword, hashPassword } from '../utils/hashing'
import { signJWT, verifyJWT } from '../utils/jwt'
import { sendVerificationEmail } from '../utils/sendVerifyEmail'

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

    const newUser = await authService.createUser(value)
    if (!newUser) {
      return sendResponseApi({
        res,
        statusCode: 500,
        message: 'Internal server error',
      })
    }
    // expireAt 1 day
    const expireTime = Date.now() + 1000 * 60 * 60 * 24

    // ngirim email verifikasi
    const min = 10000
    const max = 99999
    const tokenValue = Math.floor(Math.random() * (max - min + 1)) + min // Angka acak 5 digit
    const token = await authService.saveToken({
      user_id: newUser._id,
      token: tokenValue.toString(),
      created_at: new Date(),
      expires_at: new Date(expireTime),
    })

    await sendVerificationEmail(newUser.email, 'Verify email', token.token)

    logger.info('Success register user')
    return sendResponseApi({
      res,
      statusCode: 201,
      message: `Success register user with email ${newUser.email}, please verify your email`,
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

const verifyEmail = async (req: Request, res: Response) => {
  const { error, value } = authValidation.verifyEmailValidation(req.body)
  if (error) {
    logger.error('ERR: auth - verify = ', error.details[0].message)
    return sendResponseApi({
      res,
      statusCode: 400,
      message: error.details[0].message,
    })
  }

  try {
    const user = await authService.getUserByEmail(value.email)
    if (!user) {
      return sendResponseApi({
        res,
        statusCode: 404,
        message: 'Email not found',
      })
    }

    const token = await authService.getTokenByUserId(user._id)
    if (!token) {
      return sendResponseApi({
        res,
        statusCode: 404,
        message: 'Token not found',
      })
    }

    if (token.token !== value.token) {
      return sendResponseApi({
        res,
        statusCode: 401,
        message: 'Invalid token',
      })
    }

    if (token?.expires_at < new Date()) {
      return sendResponseApi({
        res,
        statusCode: 401,
        message: 'Token expired',
      })
    }

    const updatedUser = await authService.changeIsVerified(user._id)
    if (!updatedUser) {
      return sendResponseApi({
        res,
        statusCode: 500,
        message: 'Internal server error',
      })
    }

    logger.info('Success verify email')
    return sendResponseApi({
      res,
      statusCode: 200,
      message: 'Success verify email',
    })
  } catch (error) {
    logger.error('ERR: auth - verify = ', error)

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

const refreshToken = async (req: Request, res: Response) => {
  const { error, value } = authValidation.refreshTokenValidation(req.body)
  if (error) {
    logger.error('ERR: auth - refresh = ', error.details[0].message)
    return sendResponseApi({
      res,
      statusCode: 400,
      message: error.details[0].message,
    })
  }
  try {
    const { decoded } = verifyJWT(value.refresh_token)
    if (!decoded) {
      return sendResponseApi({
        res,
        statusCode: 401,
        message: 'Unauthorized',
      })
    }
    const user = await authService.getUserByEmail(decoded._doc.email)
    if (!user) {
      return false
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    return sendResponseApi({
      res,
      statusCode: 200,
      message: 'Success refresh token',
      data: {
        accessToken,
      },
    })
  } catch (error) {
    logger.error('ERR: auth - refresh = ', error)
    console.log(error)
    return sendResponseApi({
      res,
      statusCode: 500,
      message: 'Internal server error',
    })
  }
}

export default { registerUser, loginUser, refreshToken, verifyEmail }
