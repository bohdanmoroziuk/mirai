import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'

export const stepParamsSchema = z.object({
  stepId: objectIdSchema,
})
