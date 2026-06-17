import type { Nullish } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

export type TagEntity = {
  userId: string
  name: string
  color: Nullish<string>
}

export type Tag = Entity & TagEntity & Timestamps
