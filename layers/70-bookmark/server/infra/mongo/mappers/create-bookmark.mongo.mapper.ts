import { mapValueOr } from '@core/shared/utils/value'
import type { CreateBookmarkInput } from '../../../types/create-bookmark.types'
import type { CreateBookmarkData } from '../types/create-bookmark.mongo.types'

export const toCreateBookmarkData = (input: CreateBookmarkInput): CreateBookmarkData => {
  return {
    title: input.title,
    description: input.description,
    url: input.url,
    isFavorite: input.isFavorite,
    userId: toObjectId(input.userId),
    collectionId: mapValueOr(
      input.collectionId,
      toObjectId,
      null,
    ),
    tagIds: input.tagIds.map(toObjectId),
  }
}
