import { z } from 'zod'
import { searchSchema } from '@common/server/schemas/api.schema'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const getTagsQuerySchema = z.object({
  search: searchSchema,
})

export const createTagBodySchema = z.object({
  name: z.string().trim().toLowerCase().min(3).max(32),
  color: z.string().optional(),
})

export const deleteTagParamsSchema = z.object({
  tagId: objectIdSchema,
})

export const updateTagParamsSchema = z.object({
  tagId: objectIdSchema,
})

export const updateTagBodySchema = z.object({
  name: z.string().trim().toLowerCase().min(3).max(32).optional(),
  color: z.string().optional(),
})
