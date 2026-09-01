import { z } from 'zod'

export const caseFormStateSchema = z.object({
  title: caseTitleSchema,
  description: caseDescriptionSchema,
})
