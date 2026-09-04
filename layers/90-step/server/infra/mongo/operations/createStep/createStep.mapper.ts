import type { CreateStepInput } from '../../../../flows/createStep'
import type { CreateStepData } from './createStep.types'

export const toCreateStepData = (input: CreateStepInput): CreateStepData => {
  return {
    caseId: toObjectId(input.caseId),
    userId: toObjectId(input.userId),
    title: input.title,
    description: input.description,
    status: input.status,
    order: input.order,
  }
}
