import type { Step } from '../../../shared/types/step'
import type { StepRepository } from '../../ports/step.repository.port'

export const makeGetStepsUseCase = (stepRepository: StepRepository) => {
  return (input: GetStepsInput): Promise<Step[]> => stepRepository.findMany(input)
}
