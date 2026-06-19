import { HttpStatus } from '@core/shared/constants/http'
import { invariant } from '@core/server/utils/invariant'

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
