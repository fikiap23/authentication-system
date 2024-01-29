import { Request, Response, NextFunction } from 'express'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user
  if (!user) {
    return res
      .status(401)
      .send({ status: false, statusCode: 401, message: 'Unauthorized' })
  }
  return next()
}
