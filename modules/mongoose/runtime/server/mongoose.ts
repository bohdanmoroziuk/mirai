import mongoose from 'mongoose'
import { HttpStatus } from '@core/shared/constants/http'
import { invariant } from '@core/server/utils/invariant'
import { databaseLogger } from '@common/shared/services/logger.service'

export const requireMongodbUri = () => {
  const config = useRuntimeConfig()

  invariant(
    typeof config.mongodbUri === 'string' && config.mongodbUri.trim().length > 0,
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Missing MongoDB URI',
    {
      message: 'Runtime config value mongodbUri is required.',
    },
  )

  return config.mongodbUri
}

export const MONGOOSE_READY_STATE = {
  DISCONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3,
} as const

let connectionPromise: Promise<void> | undefined
let disconnectionPromise: Promise<void> | undefined

export const connectMongoose = async (uri: string): Promise<void> => {
  if (disconnectionPromise) {
    await disconnectionPromise
  }

  if (mongoose.connection.readyState === MONGOOSE_READY_STATE.CONNECTED) {
    return
  }

  if (connectionPromise) {
    await connectionPromise
    return
  }

  connectionPromise = (async () => {
    databaseLogger.info('Connecting to MongoDB...')

    await mongoose.connect(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    })

    databaseLogger.success('Connected to MongoDB')
  })()

  try {
    await connectionPromise
    connectionPromise = undefined
  }
  catch (error) {
    connectionPromise = undefined
    databaseLogger.error('Failed to connect to MongoDB', error)

    throw error
  }
}

export const disconnectMongoose = async (): Promise<void> => {
  if (connectionPromise) {
    try {
      await connectionPromise
    }
    catch {
      return
    }
  }

  if (mongoose.connection.readyState === MONGOOSE_READY_STATE.DISCONNECTED) {
    return
  }

  if (disconnectionPromise) {
    await disconnectionPromise
    return
  }

  disconnectionPromise = (async () => {
    databaseLogger.info('Disconnecting from MongoDB...')

    await mongoose.disconnect()

    databaseLogger.success('Disconnected from MongoDB')
  })()

  try {
    await disconnectionPromise
    connectionPromise = undefined
    disconnectionPromise = undefined
  }
  catch (error) {
    disconnectionPromise = undefined
    databaseLogger.error('Failed to disconnect from MongoDB', error)

    throw error
  }
}
