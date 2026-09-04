import { z } from 'zod'
import { objectIdSchema } from '@common/server/schemas/mongoose.schema'
import { stepDescriptionSchema, stepTitleSchema } from '../../../shared/schemas/step.schema'

export const createStepBodySchema = z.object({
  caseId: objectIdSchema,
  title: stepTitleSchema,
  description: stepDescriptionSchema,
})
