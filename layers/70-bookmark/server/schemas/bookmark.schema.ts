import z from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const createBookmarkBodySchema = z.object({
  title: z.string().trim().min(3).max(128),
  description: z.string().trim().max(512),
  url: z.url().trim(),
  isFavorite: z.boolean().default(false),
  collectionId: objectIdSchema.optional(),
  tagIds: z.array(objectIdSchema).default([]),
})

export const getBookmarkParamsSchema = z.object({
  bookmarkId: objectIdSchema,
})

export const deleteBookmarkParamsSchema = z.object({
  bookmarkId: objectIdSchema,
})

export const updateBookmarkParamsSchema = z.object({
  bookmarkId: objectIdSchema,
})

export const updateBookmarkBodySchema = z.object({
  title: z.string().trim().min(3).max(128).optional(),
  description: z.string().trim().max(512).optional(),
  url: z.url().trim().optional(),
  isFavorite: z.boolean().optional(),
  collectionId: objectIdSchema.optional(),
  tagIds: z.array(objectIdSchema).optional(),
})
