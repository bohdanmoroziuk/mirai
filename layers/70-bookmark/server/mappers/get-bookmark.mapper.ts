import type { BookmarkParams } from '../types/bookmark-params.types'
import type { GetBookmarkInput } from '../types/get-bookmark.types'

export const toGetBookmarkInput = (
  userId: string,
  params: BookmarkParams,
): GetBookmarkInput => {
  return {
    bookmarkId: params.bookmarkId,
    userId,
  }
}
