import { z } from 'zod'
import { hasDefinedProperty } from '@core/shared/utils/object'

export const updateTagBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .toLowerCase()
      .min(3)
      .max(32)
      .optional(),

    color: z
      .string()
      .trim()
      .optional(),
  })
  .refine(
    hasDefinedProperty,
    {
      error: 'At least one field must be provided',
    },
  )
