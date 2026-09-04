import type { HydratedDocument, Types } from 'mongoose'
import type { Nullable } from '@core/shared/types/common'
import type { StepStatus } from '../../../../shared/types/step'

export type StepFields = {
  caseId: Types.ObjectId
  userId: Types.ObjectId
  title: string
  description: string
  status: StepStatus
  order: number
  completedAt: Nullable<Date>
  createdAt: Date
  updatedAt: Date
}

export type StepDocument = HydratedDocument<StepFields>
