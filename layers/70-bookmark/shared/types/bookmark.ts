import type { Nullish } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

export type BookmarkEntity = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  userId: string
  collectionId: Nullish<string>
  tagIds: string[]
}

export type Bookmark = Entity & BookmarkEntity & Timestamps
