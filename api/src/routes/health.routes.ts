import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const HealthRouter: Router = Router()

/**
 * @openapi
 * /health:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('health check')
  res.status(200).send({
    status: '200',
  })
})
