import type { Nullish } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

export type CollectionEntity = {
  title: string
  userId: string
  parentId: Nullish<string>
}

export type Collection = Entity & CollectionEntity & Timestamps
