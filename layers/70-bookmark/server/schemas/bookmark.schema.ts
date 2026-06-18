import z from 'zod'
import { objectIdSchema } from '@shared/server/schemas/mongoose.schema'

export const createBookmarkBodySchema = z.object({
  title: z.string().trim().min(3).max(128),
  description: z.string().trim().max(512),
  url: z.url().trim(),
  isFavorite: z.boolean().default(false),
  collectionId: objectIdSchema.optional(),
  tagIds: z.array(objectIdSchema).default([]),
})
