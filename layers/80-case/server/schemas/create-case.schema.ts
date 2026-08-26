import { z } from 'zod'

export const createCaseBodySchema = z.object({
  title: caseTitleSchema,
  description: caseDescriptionSchema.optional(),
})
