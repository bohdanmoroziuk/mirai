import { connectMongoose, disconnectMongoose } from '@infra/server/utils/mongoose-connection'
import { requireMongodbUri } from '@infra/server/utils/mongodb-uri'

export default defineNitroPlugin(async (nitroApp) => {
  await connectMongoose(requireMongodbUri())

  nitroApp.hooks.hookOnce('close', disconnectMongoose)
})
