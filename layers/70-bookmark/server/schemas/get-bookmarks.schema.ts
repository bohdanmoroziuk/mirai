import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const getBookmarksQuerySchema = z.object({
  collectionId: objectIdSchema.optional(),
})
