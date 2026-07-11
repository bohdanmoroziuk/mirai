import { z } from 'zod'
import { searchSchema } from '@common/server/schemas/api.schema'

export const getTagsQuerySchema = z.object({
  search: searchSchema,
})
