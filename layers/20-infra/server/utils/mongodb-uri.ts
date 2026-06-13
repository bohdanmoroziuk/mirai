import { invariant } from '@core/server/utils/invariant'

export const requireMongodbUri = () => {
  const config = useRuntimeConfig()

  invariant(
    typeof config.mongodbUri === 'string' && config.mongodbUri.trim().length > 0,
    500,
    'Missing MongoDB URI',
    {
      message: 'Runtime config value mongodbUri is required.',
    },
  )

  return config.mongodbUri
}
