import type { z } from 'zod'
import type { bookmarkFormStateSchema } from '../schemas/bookmark.schema'

export type BookmarkFormState = z.infer<typeof bookmarkFormStateSchema>

export type BookmarkParams = {
  bookmarkId: string
}

export type GetBookmarkInput = {
  params: BookmarkParams
}

export type BookmarksQuery = {
  collectionId?: string
}

export type GetBookmarksInput = {
  query: BookmarksQuery
}

export type BookmarkPayload = BookmarkFormState

export type CreateBookmarkInput = {
  body: BookmarkPayload
}

export type UpdateBookmarkInput = {
  params: BookmarkParams
  body: BookmarkPayload
}

export type DeleteBookmarkInput = {
  params: BookmarkParams
}

export type DeleteBookmarkOutput = SuccessOutput
