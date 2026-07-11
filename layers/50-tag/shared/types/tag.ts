import type { Entity, Timestamps } from '@core/shared/types/entity'

export type TagEntity = {
  userId: string
  name: string
  color: string
}

export type Tag = Entity & TagEntity & Timestamps
