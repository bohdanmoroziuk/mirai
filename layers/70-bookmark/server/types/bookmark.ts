import type z from 'zod'
import type { HydratedDocument, QueryFilter, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { QuerySort } from '@common/server/types/mongoose'
import type { createBookmarkBodySchema } from '@bookmark/server/schemas/bookmark.schema'

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

export type CreateBookmarkBody = z.infer<typeof createBookmarkBodySchema>

export type CreateBookmarkInput = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  userId: string
  collectionId: Nullish<string>
  tagIds: string[]
}

export type CreateBookmarkDocumentInput = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  userId: Types.ObjectId
  collectionId: Nullish<Types.ObjectId>
  tagIds: Types.ObjectId[]
}

export type GetBookmarksInput = {
  userId: string
}

export type FindBookmarksDocumentsQuery = {
  filter: QueryFilter<BookmarkSchema>
  sort: QuerySort<BookmarkSchema>
}
