import type { z } from 'zod'
import type { bookmarkFormStateSchema } from '../schemas/bookmark.schema'

export type BookmarkFormState = z.infer<typeof bookmarkFormStateSchema>

export type BookmarkPayload = BookmarkFormState

export type GetBookmarksQuery = {
  collectionId?: string
}

export type GetBookmarksInput = {
  query?: GetBookmarksQuery
}

export type CreateBookmarkInput = {
  body: BookmarkPayload
}

export type DeleteBookmarkInput = {
  params: {
    bookmarkId: string
  }
}

export type DeleteBookmarkOutput = SuccessOutput
