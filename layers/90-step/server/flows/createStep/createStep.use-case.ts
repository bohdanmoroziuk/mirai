import type { Step } from '../../../shared/types/step'
import type { StepRepository } from '../../ports/step.repository.port'
import type { CreateStepInput } from './createStep.types'

// TODO: Validate that caseId exists and belongs to the authenticated user before creating a step
export const makeCreateStepUseCase = (stepRepository: StepRepository) => {
  return (input: CreateStepInput): Promise<Step> => {
    return stepRepository.createOne(input)
  }
}
