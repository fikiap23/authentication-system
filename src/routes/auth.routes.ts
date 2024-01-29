import { Router } from 'express'
import authController from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', authController.registerUser)
