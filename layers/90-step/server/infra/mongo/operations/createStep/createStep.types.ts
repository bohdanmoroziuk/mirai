import type { StepFields } from '../../types/step.mongo.types'

export type CreateStepData = Pick<
  StepFields,
  | 'userId'
  | 'caseId'
  | 'title'
  | 'description'
  | 'status'
  | 'order'
>
