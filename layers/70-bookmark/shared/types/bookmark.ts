import type { Nullable } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

export type BookmarkEntity = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  userId: string
  collectionId: Nullable<string>
  tagIds: string[]
}

export type Bookmark = Entity & BookmarkEntity & Timestamps
