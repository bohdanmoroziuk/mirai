import type { SortOrder, Types } from 'mongoose'

export type FindBookmarksQuery = {
  filter: {
    userId: Types.ObjectId
    collectionId?: Types.ObjectId
  }
  sort: {
    createdAt: SortOrder
  }
}
