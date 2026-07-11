import { z } from 'zod'
import { hasDefinedProperty } from '@core/shared/utils/object'
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

    collectionId: objectIdSchema.nullish(),

    tagIds: z
      .array(objectIdSchema)
      .optional(),
  })
  .refine(
    hasDefinedProperty,
    {
      error: 'At least one field must be provided',
    },
  )
