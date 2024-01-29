import jwt from 'jsonwebtoken'
import CONFIG from '../config/environment'

export const signJWT = (payload: Object, option?: jwt.SignOptions) => {
  if (!CONFIG.jwt_private_key) {
    throw new Error('JWT private key is not defined in the .env file')
  }
  return jwt.sign(payload, CONFIG.jwt_private_key, {
    ...(option && option),
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token: string) => {
  try {
    if (!CONFIG.jwt_public_key) {
      throw new Error('JWT public key is not defined in the .env file')
    }
    const decoded: any = jwt.verify(token, CONFIG.jwt_public_key)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired or invalid token',
      decoded: null
    }
  }
}
