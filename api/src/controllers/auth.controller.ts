import { Request, Response } from 'express'
import crypto from 'crypto'
import { ObjectId } from 'mongodb'
import authService from '../services/auth.service'
import { logger } from '../utils/logger'
import sendResponseApi from '../utils/sendResponseApi'
import authValidation from '../validations/auth.validation'
import { comparePassword, hashPassword } from '../utils/hashing'
import { signJWT, verifyJWT } from '../utils/jwt'
import { sendVerificationEmail } from '../utils/sendVerifyEmail'
import CONFIG from '../config/environment'

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

    const message: string = `Your verification code is ${tokenValue}`
    await sendVerificationEmail(newUser.email, 'Verify email', message)

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

    await authService.deleteToken(user._id)

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

    // check is email verified
    if (!user.verified) {
      return sendResponseApi({
        res,
        statusCode: 401,
        message: 'Email not verified, please verify your email',
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

const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const { error, value } = authValidation.sendResetPasswordEmailValidation(
    req.body
  )
  if (error) {
    logger.error(
      'ERR: auth - send reset password email = ',
      error.details[0].message
    )
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

    // Generate and save reset token
    const tokenValue = crypto.randomBytes(32).toString('hex')
    const resetToken = await authService.saveResetToken({
      user_id: user._id,
      token: tokenValue,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 1000 * 60 * 30), // Expires in 30 minutes
    })

    if (!resetToken) {
      return sendResponseApi({
        res,
        statusCode: 500,
        message: 'Internal server error',
      })
    }

    // Send reset password email
    const resetPasswordLink = `${CONFIG.client_url}/reset-password/${user._id}/${resetToken.token}`
    const message = `Click this link to reset your password: ${resetPasswordLink}`
    const result = await sendVerificationEmail(
      user.email,
      'Reset Password',
      message
    )
    console.log(result)

    logger.info('Success send reset password email')
    return sendResponseApi({
      res,
      statusCode: 200,
      message: `Success send reset password email to ${user.email}, please check your email`,
    })
  } catch (error) {
    logger.error('ERR: auth - send reset password email = ', error)
    return sendResponseApi({
      res,
      statusCode: 500,
      message: 'Internal server error',
    })
  }
}

const resetPassword = async (req: Request, res: Response) => {
  const { userId, token } = req.params
  let newPassword = req.body.newPassword

  try {
    if (!userId || !token || !newPassword) {
      return sendResponseApi({
        res,
        statusCode: 400,
        message: 'Missing required parameters',
      })
    }
    // Validasi token dan ambil informasi reset token
    const tokenFormDB = await authService.getTokenByUserId(
      userId as unknown as ObjectId
    )

    if (!tokenFormDB) {
      return sendResponseApi({
        res,
        statusCode: 404,
        message: 'Reset token not found',
      })
    }
    if (!tokenFormDB || tokenFormDB.expires_at < new Date()) {
      return sendResponseApi({
        res,
        statusCode: 401,
        message: ' expired reset token',
      })
    }

    // Validasi token
    // console.log(token.length, tokenFormDB.token.length)
    if (token.trim() !== tokenFormDB.token.trim()) {
      return sendResponseApi({
        res,
        statusCode: 401,
        message: 'Invalid reset token',
      })
    }

    // Hash password
    newPassword = await hashPassword(newPassword)
    // Reset password untuk user dengan userId
    const updatedUser = await authService.resetPassword(
      userId as unknown as ObjectId,
      newPassword
    )

    if (!updatedUser) {
      return sendResponseApi({
        res,
        statusCode: 500,
        message: 'Internal server error',
      })
    }

    // Optional: Hapus reset token setelah penggunaan
    await authService.deleteToken(userId as unknown as ObjectId)

    return sendResponseApi({
      res,
      statusCode: 200,
      message: 'Password reset successfully',
    })
  } catch (error) {
    logger.error('ERR: auth - reset password = ', error)
    return sendResponseApi({
      res,
      statusCode: 500,
      message: 'Internal server error',
    })
  }
}

export default {
  registerUser,
  loginUser,
  refreshToken,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
}
