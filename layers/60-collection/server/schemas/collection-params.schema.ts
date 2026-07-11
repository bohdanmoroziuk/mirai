import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const collectionParamsSchema = z.object({
  collectionId: objectIdSchema,
})
