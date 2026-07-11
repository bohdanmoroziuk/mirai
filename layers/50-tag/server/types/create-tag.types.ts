import type { z } from 'zod'
import type { createTagBodySchema } from '../schemas/create-tag.schema'

export type CreateTagBody = z.infer<typeof createTagBodySchema>

export type CreateTagInput = {
  userId: string
  name: string
  color: string
}
