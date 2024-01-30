import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { routes } from '../routes'
import deserializedToken from '../middlewares/deserializedToken'
import CONFIG from '../config/environment'

const createServer = () => {
  const app: Application = express()

  // parse body request
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // cors access handler
  app.use(
    cors({
      origin: CONFIG.client_url,
      credentials: true,
    })
  )
  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*')
  //   res.setHeader('Access-Control-Allow-Methods', '*')
  //   res.setHeader('Access-Control-Allow-Headers', '*')
  //   next()
  // })

  app.use(deserializedToken)

  routes(app)

  return app
}

export default createServer
