import type { BookmarkParams } from '../types/bookmark-params.types'
import type { DeleteBookmarkInput } from '../types/delete-bookmark.types'

export const toDeleteBookmarkInput = (
  userId: string,
  params: BookmarkParams,
): DeleteBookmarkInput => {
  return {
    bookmarkId: params.bookmarkId,
    userId,
  }
}
