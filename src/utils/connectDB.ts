import mongoose from 'mongoose'
import config from '../config/environment'
import { logger } from './logger'

const connectDB = async () => {
  mongoose
    .connect(`${config.db}`)
    .then(() => {
      logger.info('database connected')
    })
    .catch((err) => {
      logger.info('database not connected')
      logger.error(err)
      process.exit(1)
    })
}

export default connectDB
