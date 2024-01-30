import { logger } from './utils/logger'
import createServer from './utils/server'
import connectDB from './utils/connectDB'
import swaggerDocs from './utils/swagger'

connectDB()

const app = createServer()
const port: number = 4000

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)

  swaggerDocs(app, port)
})
