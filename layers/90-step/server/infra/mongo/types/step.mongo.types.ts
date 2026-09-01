import type { HydratedDocument, Types } from 'mongoose'
import type { StepStatus } from '../../../../shared/types/step'

export type StepFields = {
  caseId: Types.ObjectId
  title: string
  description?: string
  status: StepStatus
  order: number
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type StepDocument = HydratedDocument<StepFields>
