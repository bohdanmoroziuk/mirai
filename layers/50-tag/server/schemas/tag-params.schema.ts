import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const tagParamsSchema = z.object({
  tagId: objectIdSchema,
})
