import type z from 'zod'
import type { HydratedDocument, QueryFilter, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type {
  getBookmarkParamsSchema,
} from '../schemas/bookmark.schema'

export type BookmarkSchema = {
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

export type BookmarkDocument = HydratedDocument<BookmarkSchema>

export type GetBookmarkParams = z.infer<typeof getBookmarkParamsSchema>

export type GetBookmarkInput = {
  bookmarkId: string
  userId: string
}

export type FindBookmarkDocumentQuery = {
  filter: QueryFilter<BookmarkSchema>
}
