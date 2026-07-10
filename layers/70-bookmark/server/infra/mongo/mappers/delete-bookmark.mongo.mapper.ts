import type { DeleteBookmarkInput } from '../../../types/delete-bookmark.types'
import type { DeleteBookmarkQuery } from '../types/delete-bookmark.mongo.types'

export const toDeleteBookmarkQuery = (
  input: DeleteBookmarkInput,
): DeleteBookmarkQuery => {
  return {
    filter: {
      _id: toObjectId(input.bookmarkId),
      userId: toObjectId(input.userId),
    },
  }
}
