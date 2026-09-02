import { StepStatus } from '../../../shared/types/step'
import type { CreateStepBody, CreateStepInput } from './createStep.types'

export const toCreateStepInput = (
  userId: string,
  body: CreateStepBody,
): CreateStepInput => {
  return {
    userId,
    caseId: body.caseId,
    title: body.title,
    status: StepStatus.Pending,
    // TODO: Replace hard-coded `order: 1` with per-case sequential ordering
    order: 1,
    description: body.description,
  }
}
