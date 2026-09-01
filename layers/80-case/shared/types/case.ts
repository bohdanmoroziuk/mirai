import type { Entity, Timestamps } from '@core/shared/types/entity'

export type CaseEntity = {
  title: string
  description?: string
  userId: string
}

export type Case = Entity & CaseEntity & Timestamps

export type CaseStats = {
  total: number
  active: number
  completed: number
  empty: number
}
