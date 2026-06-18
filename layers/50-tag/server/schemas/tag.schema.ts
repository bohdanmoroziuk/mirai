import { z } from 'zod'
import { objectIdSchema } from '@shared/server/schemas/mongoose.schema'

export const createTagBodySchema = z.object({
  name: z.string().trim().min(3).max(32),
  color: z.string().optional(),
})

export const deleteTagParamsSchema = z.object({
  tagId: objectIdSchema,
})
