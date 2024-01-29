import { Router } from 'express'
import authController from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', authController.registerUser)
AuthRouter.post('/login', authController.loginUser)
AuthRouter.post('/refresh', authController.refreshToken)
AuthRouter.post('/verify', authController.verifyEmail)
AuthRouter.post('/reset-password', authController.sendResetPasswordEmail)
AuthRouter.post('/reset-password/:userId/:token', authController.resetPassword)
