import mongoose from 'mongoose'

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
    console.log('Connecting to MongoDB...')

    await mongoose.connect(uri)

    console.log('Connected to MongoDB')
  }
  catch (error) {
    console.error('Failed to connect to MongoDB', error)

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
    console.log('Disconnecting from MongoDB...')

    await mongoose.disconnect()

    console.log('Disconnected from MongoDB')
  }
  catch (error) {
    console.error('Failed to disconnect from MongoDB', error)

    throw error
  }
}
