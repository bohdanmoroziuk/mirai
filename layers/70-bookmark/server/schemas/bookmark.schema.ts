import z from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const getBookmarkParamsSchema = z.object({
  bookmarkId: objectIdSchema,
})
