import { connectMongoose, disconnectMongoose } from '../../server/utils/mongoose-connection'
import { requireMongodbUri } from '../../server/utils/mongodb-uri'

export default defineNitroPlugin(async (nitroApp) => {
  await connectMongoose(requireMongodbUri())

  nitroApp.hooks.hookOnce('close', disconnectMongoose)
})
