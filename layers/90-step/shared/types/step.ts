import type { Nullable } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

export const stepStatuses = {
  Pending: 'pending',
  Active: 'active',
  Completed: 'completed',
  Skipped: 'skipped',
} as const

export type StepStatus = typeof stepStatuses[keyof typeof stepStatuses]

export type StepEntity = {
  caseId: string
  userId: string
  title: string
  description: string
  status: StepStatus
  order: number
  completedAt: Nullable<string>
}

export type Step = Entity & StepEntity & Timestamps
