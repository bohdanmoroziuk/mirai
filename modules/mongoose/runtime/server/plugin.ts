import { requireMongodbUri, connectMongoose, disconnectMongoose } from './mongoose'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async () => {
    await connectMongoose(requireMongodbUri())
  })

  nitroApp.hooks.hook('close', async () => {
    await disconnectMongoose()
  })
})
