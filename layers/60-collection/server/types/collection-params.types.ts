import type { z } from 'zod'
import type { collectionParamsSchema } from '../schemas/collection-params.schema'

export type CollectionParams = z.output<typeof collectionParamsSchema>
