import type { GetBookmarksInput, GetBookmarksQuery } from '../types/get-bookmarks.types'

export const toGetBookmarksInput = (
  userId: string,
  query: GetBookmarksQuery,
): GetBookmarksInput => {
  return {
    userId,
    collectionId: query.collectionId,
  }
}
