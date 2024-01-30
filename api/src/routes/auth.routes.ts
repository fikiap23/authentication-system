import { Router } from 'express'
import authController from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

/**
 * @openapi
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUserValidation'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       409:
 *         description: Conflict - Email already exists
 *       500:
 *         description: Internal server error
 */
AuthRouter.post('/register', authController.registerUser)

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Endpoint for user login.
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUserValidation'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Incorrect credentials
 *       500:
 *         description: Internal server error
 */
AuthRouter.post('/login', authController.loginUser)

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh access token
 *     description: Endpoint to refresh the user's access token.
 *     requestBody:
 *       description: Refresh token data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/refreshTokenValidation'
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Invalid refresh token
 *       500:
 *         description: Internal server error
 */
AuthRouter.post('/refresh', authController.refreshToken)

/**
 * @openapi
 * /auth/verify:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify user's email
 *     description: Endpoint to verify the user's email.
 *     requestBody:
 *       description: Email verification data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/verifyEmailValidation'
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Not Found - User not found or invalid token
 *       500:
 *         description: Internal server error
 */
AuthRouter.post('/verify', authController.verifyEmail)

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Send reset password email
 *     description: Endpoint to send a reset password email to the user.
 *     requestBody:
 *       description: Reset password email data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sendResetPasswordEmailValidation'
 *     responses:
 *       200:
 *         description: Reset password email sent successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Not Found - User not found
 *       500:
 *         description: Internal server error
 */
AuthRouter.post('/reset-password', authController.sendResetPasswordEmail)

/**
 * @openapi
 * /auth/reset-password/{userId}/{token}:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset user's password
 *     description: Endpoint to reset the user's password using a token.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset password token
 *     requestBody:
 *       description: New password data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/resetPasswordValidation'
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Invalid token
 *       404:
 *         description: Not Found - User not found or invalid token
 *       500:
 *         description: Internal server error
 */
AuthRouter.post('/reset-password/:userId/:token', authController.resetPassword)

export default AuthRouter
