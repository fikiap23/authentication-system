import { Application, Router } from 'express'
import { HealthRouter } from './health.routes'
import { AuthRouter } from './auth.routes'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/auth', AuthRouter],
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
