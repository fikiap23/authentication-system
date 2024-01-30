import Joi from 'joi'
import UserType from '../types/user.type'

/**
 * @openapi
 * components:
 *  schemas:
 *    createUserValidation:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    loginUserValidation:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    refreshTokenValidation:
 *      type: object
 *      required:
 *        - refresh_token
 *      properties:
 *        refresh_token:
 *          type: string
 *          default: sampleRefreshToken
 *    verifyEmailValidation:
 *      type: object
 *      required:
 *        - email
 *        - token
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          default: jane.doe@example.com
 *        token:
 *          type: string
 *          default: sampleVerificationToken
 *    sendResetPasswordEmailValidation:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          default: jane.doe@example.com
 *    resetPasswordValidation:
 *      type: object
 *      required:
 *        - newPassword
 *      properties:
 *        newPassword:
 *          type: string
 *          default: stringPassword123
 */

const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
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

const verifyEmailValidation = (payload: { email: string; token: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
  })

  return schema.validate(payload)
}

const sendResetPasswordEmailValidation = (payload: { email: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  })

  return schema.validate(payload)
}

export default {
  createUserValidation,
  loginUserValidation,
  refreshTokenValidation,
  verifyEmailValidation,
  sendResetPasswordEmailValidation,
}
