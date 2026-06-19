import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const createTagBodySchema = z.object({
  name: z.string().trim().min(3).max(32),
  color: z.string().optional(),
})

export const deleteTagParamsSchema = z.object({
  tagId: objectIdSchema,
})

export const updateTagParamsSchema = z.object({
  tagId: objectIdSchema,
})

export const updateTagBodySchema = z.object({
  name: z.string().trim().min(3).max(32).optional(),
  color: z.string().optional(),
})
