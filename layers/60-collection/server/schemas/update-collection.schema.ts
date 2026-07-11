import { z } from 'zod'
import { collectionTitleSchema } from './collection.schema'

export const updateCollectionBodySchema = z.object({
  title: collectionTitleSchema,
})
