import type { z } from 'zod'
import type { getTagsQuerySchema } from '../schemas/get-tags.schema'

export type GetTagsQuery = z.infer<typeof getTagsQuerySchema>

export type GetTagsInput = {
  userId: string
  search?: string
}
