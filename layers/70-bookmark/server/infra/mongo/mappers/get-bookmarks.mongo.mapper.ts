import { compactObject } from '@core/shared/utils/object'
import type { GetBookmarksInput } from '../../../types/get-bookmarks.types'
import type { FindBookmarksQuery } from '../types/get-bookmarks.mongo.types'

export const toFindBookmarksQuery = (
  input: GetBookmarksInput,
): FindBookmarksQuery => {
  return {
    filter: compactObject({
      userId: toObjectId(input.userId),

      collectionId: mapValueOr(
        input.collectionId,
        toObjectId,
        undefined,
      ),
    }),

    sort: {
      createdAt: -1,
    },
  }
}
