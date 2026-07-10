import type { BookmarkParams } from '../types/bookmark-params.types'
import type { UpdateBookmarkBody, UpdateBookmarkInput } from '../types/update-bookmark.types'

export const toUpdateBookmarkInput = (
  userId: string,
  params: BookmarkParams,
  body: UpdateBookmarkBody,
): UpdateBookmarkInput => {
  return {
    bookmarkId: params.bookmarkId,
    title: body.title,
    description: body.description,
    url: body.url,
    isFavorite: body.isFavorite,
    userId,
    collectionId: body.collectionId,
    tagIds: body.tagIds,
  }
}
