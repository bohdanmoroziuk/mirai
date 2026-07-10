import type { UserSessionRequired } from '#auth-utils'
import type { Bookmark } from '../../shared/types/bookmark'
import type {
  BookmarkDocument,
  GetBookmarkParams,
  GetBookmarkInput,
  FindBookmarkDocumentQuery,
} from '../types/bookmark'

export const toBookmark = (document: BookmarkDocument): Bookmark => {
  return {
    id: document._id.toString(),
    title: document.title,
    description: document.description,
    url: document.url,
    isFavorite: document.isFavorite,
    userId: document.userId.toString(),
    collectionId: document.collectionId?.toString() ?? null,
    tagIds: document.tagIds.map(tagId => tagId.toString()),
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  }
}

export const toGetBookmarkInput = (
  session: UserSessionRequired,
  params: GetBookmarkParams,
): GetBookmarkInput => {
  return {
    bookmarkId: params.bookmarkId,
    userId: session.user.id,
  }
}

export const toFindBookmarkDocumentQuery = (
  input: GetBookmarkInput,
): FindBookmarkDocumentQuery => {
  return {
    filter: {
      _id: toObjectId(input.bookmarkId),
      userId: toObjectId(input.userId),
    },
  }
}
