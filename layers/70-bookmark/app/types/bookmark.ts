import type { z } from 'zod'
import type { bookmarkPayloadSchema } from '../schemas/bookmark.schema'

export type BookmarkPayload = z.infer<typeof bookmarkPayloadSchema>

export type BookmarkFormState = BookmarkPayload

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
