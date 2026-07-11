import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'
import { collectionTitleSchema } from './collection.schema'

export const createCollectionBodySchema = z.object({
  title: collectionTitleSchema,
  parentId: objectIdSchema.nullish(),
})
