import { mapValueOr } from '@core/shared/utils/value'
import { compactObject } from '@core/shared/utils/object'
import type { UpdateBookmarkInput } from '../../../types/update-bookmark.types'
import type { UpdateBookmarkQuery } from '../types/update-bookmark.mongo.types'

export const toUpdateBookmarkQuery = (
  input: UpdateBookmarkInput,
): UpdateBookmarkQuery => {
  return {
    filter: {
      _id: toObjectId(input.bookmarkId),
      userId: toObjectId(input.userId),
    },
    update: {
      $set: compactObject({
        title: input.title,
        description: input.description,
        url: input.url,
        isFavorite: input.isFavorite,
        collectionId: input.collectionId === undefined
          ? undefined
          : mapValueOr(
              input.collectionId,
              toObjectId,
              null,
            ),
        tagIds: input.tagIds?.map(toObjectId),
      }),
    },
    options: {
      runValidators: true,
      returnDocument: 'after',
    },
  }
}
