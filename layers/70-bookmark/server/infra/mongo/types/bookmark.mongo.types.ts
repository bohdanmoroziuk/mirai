import type { HydratedDocument, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'

export type BookmarkFields = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  userId: Types.ObjectId
  collectionId: Nullish<Types.ObjectId>
  tagIds: Types.ObjectId[]
  updatedAt: Date
  createdAt: Date
}

export type BookmarkDocument = HydratedDocument<BookmarkFields>
