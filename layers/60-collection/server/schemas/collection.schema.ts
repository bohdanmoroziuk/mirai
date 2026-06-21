import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const createCollectionBodySchema = z.object({
  title: z.string().trim().min(3).max(120),
  parentId: objectIdSchema.optional(),
})

export const getCollectionParamsSchema = z.object({
  collectionId: objectIdSchema,
})

export const updateCollectionParamsSchema = z.object({
  collectionId: objectIdSchema,
})

export const updateCollectionBodySchema = z.object({
  title: z.string().trim().min(3).max(120),
})

export const deleteCollectionParamsSchema = z.object({
  collectionId: objectIdSchema,
})
