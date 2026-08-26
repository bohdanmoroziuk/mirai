import { z } from 'zod'
import { hasDefinedProperty } from '@core/shared/utils/object'

export const updateCaseBodySchema = z
  .object({
    title: caseTitleSchema.optional(),
    description: caseDescriptionSchema.optional(),
  })
  .refine(
    hasDefinedProperty,
    {
      error: 'At least one field must be provided',
    },
  )
