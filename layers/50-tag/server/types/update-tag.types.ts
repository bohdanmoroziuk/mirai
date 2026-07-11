import type { z } from 'zod'
import type { updateTagBodySchema } from '../schemas/update-tag.schema'

export type UpdateTagBody = z.infer<typeof updateTagBodySchema>

export type UpdateTagInput = {
  userId: string
  tagId: string
  name?: string
  color?: string
}
