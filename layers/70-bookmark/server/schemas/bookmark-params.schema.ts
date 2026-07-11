import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const bookmarkParamsSchema = z.object({
  bookmarkId: objectIdSchema,
})
