import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const getStepsQuerySchema = z.object({
  caseId: objectIdSchema,
})
