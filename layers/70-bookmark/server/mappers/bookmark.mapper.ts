import type { UserSessionRequired } from '#auth-utils'
import type { Bookmark } from '../../shared/types/bookmark'
import type {
  BookmarkDocument,
  GetBookmarkParams,
  GetBookmarkInput,
  FindBookmarkDocumentQuery,
  UpdateBookmarkInput,
  UpdateBookmarkParams,
  UpdateBookmarkBody,
  UpdateBookmarkDocumentQuery,
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

export const toUpdateBookmarkInput = (
  session: UserSessionRequired,
  params: UpdateBookmarkParams,
  body: UpdateBookmarkBody,
): UpdateBookmarkInput => {
  return {
    bookmarkId: params.bookmarkId,
    userId: session.user.id,
    title: body.title,
    description: body.description,
    url: body.url,
    isFavorite: body.isFavorite,
    collectionId: body.collectionId,
    tagIds: body.tagIds,
  }
}

export const toUpdateBookmarkDocumentQuery = (
  input: UpdateBookmarkInput,
): UpdateBookmarkDocumentQuery => {
  return {
    filter: {
      _id: toObjectId(input.bookmarkId),
      userId: toObjectId(input.userId),
    },
    update: {
      $set: {
        title: input.title,
        description: input.description,
        url: input.url,
        isFavorite: input.isFavorite,
        collectionId: toNullableObjectId(input.collectionId),
        tagIds: input.tagIds?.map(toObjectId),
      },
    },
    options: {
      runValidators: true,
      returnDocument: 'after',
    },
  }
}
