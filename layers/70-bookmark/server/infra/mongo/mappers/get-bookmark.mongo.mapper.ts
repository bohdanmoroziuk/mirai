import type { GetBookmarkInput } from '../../../types/get-bookmark.types'
import type { FindBookmarkQuery } from '../types/get-bookmark.mongo.types'

export const toFindBookmarkQuery = (
  input: GetBookmarkInput,
): FindBookmarkQuery => {
  return {
    filter: {
      _id: toObjectId(input.bookmarkId),
      userId: toObjectId(input.userId),
    },
  }
}
