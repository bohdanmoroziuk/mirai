import { mapValueOr } from '@core/shared/utils/value'
import type { Bookmark } from '../../../../shared/types/bookmark'
import type { BookmarkDocument } from '../types/bookmark.mongo.types'

export const toBookmark = (document: BookmarkDocument): Bookmark => {
  return {
    id: document._id.toString(),
    title: document.title,
    description: document.description,
    url: document.url,
    isFavorite: document.isFavorite,
    userId: document.userId.toString(),
    collectionId: mapValueOr(
      document.collectionId,
      collectionId => collectionId.toString(),
      undefined,
    ),
    tagIds: document.tagIds.map(tagId => tagId.toString()),
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  }
}
