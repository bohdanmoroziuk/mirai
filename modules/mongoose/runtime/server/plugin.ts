import { requireMongodbUri, connectMongoose, disconnectMongoose } from './mongoose'

export default defineNitroPlugin((nitroApp) => {
  const mongodbUri = requireMongodbUri()

  void connectMongoose(mongodbUri).catch(() => undefined)

  nitroApp.hooks.hook('request', async () => {
    await connectMongoose(mongodbUri)
  })

  nitroApp.hooks.hook('close', async () => {
    await disconnectMongoose()
  })
})
