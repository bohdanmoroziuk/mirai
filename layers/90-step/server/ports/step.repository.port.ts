import type { Step } from '../../shared/types/step'
import type { CreateStepInput } from '../flows/createStep'
import type { GetStepsInput } from '../flows/getSteps'

export interface StepRepository {
  createOne(input: CreateStepInput): Promise<Step>
  findMany(input: GetStepsInput): Promise<Step[]>
}
