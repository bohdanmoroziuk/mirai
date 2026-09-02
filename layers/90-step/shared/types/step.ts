import type { Nullable } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

export const StepStatus = {
  Pending: 'pending',
  Active: 'active',
  Completed: 'completed',
  Skipped: 'skipped',
} as const

export type StepStatus = typeof StepStatus[keyof typeof StepStatus]

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
