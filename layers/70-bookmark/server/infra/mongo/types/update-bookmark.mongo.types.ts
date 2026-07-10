import type { QueryOptions, UpdateQuery, Types } from 'mongoose'
import type { BookmarkFields } from '../types/bookmark.mongo.types'

export type UpdateBookmarkQuery = {
  filter: {
    _id: Types.ObjectId
    userId: Types.ObjectId
  }
  update: UpdateQuery<BookmarkFields>
  options: QueryOptions<BookmarkFields>
}
