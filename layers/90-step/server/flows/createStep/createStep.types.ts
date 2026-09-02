import type { z } from 'zod'
import type { StepStatus } from '../../../shared/types/step'
import type { createStepBodySchema } from './createStep.schema'

export type CreateStepBody = z.infer<typeof createStepBodySchema>

export type CreateStepInput = {
  caseId: string
  userId: string
  title: string
  status: StepStatus
  order: number
  description: string
}
