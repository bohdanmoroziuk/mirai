import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const updateBookmarkBodySchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3)
      .max(128)
      .optional(),

    description: z
      .string()
      .trim()
      .max(512)
      .optional(),

    url: z
      .url()
      .trim()
      .optional(),

    isFavorite: z
      .boolean()
      .optional(),

    collectionId: objectIdSchema.optional(),

    tagIds: z
      .array(objectIdSchema)
      .optional(),
  })
  .refine(
    body => Object.values(body).some(value => value !== undefined),
    {
      message: 'At least one field must be provided',
    },
  )
