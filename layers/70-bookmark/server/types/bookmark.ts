import type z from 'zod'
import type { HydratedDocument, QueryFilter, QueryOptions, Types, UpdateQuery } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { SuccessOutput } from '@core/shared/types/api'
import type { QuerySort } from '@common/server/types/mongoose'
import type {
  createBookmarkBodySchema,
  getBookmarkParamsSchema,
  deleteBookmarkParamsSchema,
  updateBookmarkParamsSchema,
  updateBookmarkBodySchema,
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

export type GetBookmarkParams = z.infer<typeof getBookmarkParamsSchema>

export type GetBookmarkInput = {
  bookmarkId: string
  userId: string
}

export type FindBookmarkDocumentQuery = {
  filter: QueryFilter<BookmarkSchema>
}

export type DeleteBookmarkParams = z.infer<typeof deleteBookmarkParamsSchema>

export type DeleteBookmarkInput = {
  bookmarkId: string
  userId: string
}

export type DeleteBookmarkOutput = SuccessOutput

export type DeleteBookmarkDocumentQuery = {
  filter: QueryFilter<BookmarkSchema>
}

export type UpdateBookmarkParams = z.infer<typeof updateBookmarkParamsSchema>

export type UpdateBookmarkBody = z.infer<typeof updateBookmarkBodySchema>

export type UpdateBookmarkInput = {
  bookmarkId: string
  userId: string
  title?: Nullish<string>
  description?: Nullish<string>
  url?: Nullish<string>
  isFavorite?: Nullish<boolean>
  collectionId?: Nullish<string>
  tagIds?: Nullish<string[]>
}

export type UpdateBookmarkDocumentQuery = {
  filter: QueryFilter<BookmarkSchema>
  update: UpdateQuery<BookmarkSchema>
  options: QueryOptions<BookmarkSchema>
}
