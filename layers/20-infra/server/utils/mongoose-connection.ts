import mongoose from 'mongoose'
import { databaseLogger } from '@infra/shared/services/logger.service'

export const MONGOOSE_READY_STATE = {
  DISCONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3,
} as const

export const connectMongoose = async (uri: string) => {
  if (mongoose.connection.readyState === MONGOOSE_READY_STATE.CONNECTED) {
    return
  }

  if (mongoose.connection.readyState === MONGOOSE_READY_STATE.CONNECTING) {
    return
  }

  try {
    databaseLogger.info('Connecting to MongoDB...')

    await mongoose.connect(uri)

    databaseLogger.success('Connected to MongoDB')
  }
  catch (error) {
    databaseLogger.error('Failed to connect to MongoDB', error)

    throw error
  }
}

export const disconnectMongoose = async () => {
  if (mongoose.connection.readyState === MONGOOSE_READY_STATE.DISCONNECTED) {
    return
  }

  if (mongoose.connection.readyState === MONGOOSE_READY_STATE.DISCONNECTING) {
    return
  }

  try {
    databaseLogger.info('Disconnecting from MongoDB...')

    await mongoose.disconnect()

    databaseLogger.success('Disconnected from MongoDB')
  }
  catch (error) {
    databaseLogger.error('Failed to disconnect from MongoDB', error)

    throw error
  }
}
