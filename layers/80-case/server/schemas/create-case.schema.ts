import { z } from 'zod'
import { caseDescriptionSchema, caseTitleSchema } from './case.schema'

export const createCaseBodySchema = z.object({
  title: caseTitleSchema,
  description: caseDescriptionSchema.optional(),
})
