import type { Entity, Timestamps } from '@core/shared/types/entity'

export type TagEntity = {
  userId: string
  name: string
  color: string | undefined
}

export type Tag = Entity & TagEntity & Timestamps
