import type { Step } from '../../shared/types/step'
import type { CreateStepInput } from '../flows/createStep'

export interface StepRepository {
  createOne(input: CreateStepInput): Promise<Step>
}
