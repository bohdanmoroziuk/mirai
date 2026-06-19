import type { UserSessionRequired } from '#auth-utils'
import type { Bookmark } from '@bookmark/shared/types/bookmark'
import type {
  BookmarkDocument,
  CreateBookmarkBody,
  CreateBookmarkInput,
  CreateBookmarkDocumentInput,
  GetBookmarksInput,
  FindBookmarksDocumentsQuery,
  GetBookmarkParams,
  GetBookmarkInput,
  FindBookmarkDocumentQuery,
  DeleteBookmarkParams,
  DeleteBookmarkInput,
  DeleteBookmarkDocumentQuery,
} from '@bookmark/server/types/bookmark'

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

export const toCreateBookmarkInput = (
  session: UserSessionRequired,
  body: CreateBookmarkBody,
): CreateBookmarkInput => {
  return {
    title: body.title,
    description: body.description,
    url: body.url,
    isFavorite: body.isFavorite,
    userId: session.user.id,
    collectionId: body.collectionId,
    tagIds: body.tagIds,
  }
}

export const toCreateBookmarkDocumentInput = (
  input: CreateBookmarkInput,
): CreateBookmarkDocumentInput => {
  return {
    title: input.title,
    description: input.description,
    url: input.url,
    isFavorite: input.isFavorite,
    userId: toObjectId(input.userId),
    collectionId: toNullableObjectId(input.collectionId),
    tagIds: input.tagIds.map(toObjectId),
  }
}

export const toGetBookmarksInput = (
  session: UserSessionRequired,
): GetBookmarksInput => {
  return {
    userId: session.user.id,
  }
}

export const toFindBookmarkDocumentsQuery = (
  input: GetBookmarksInput,
): FindBookmarksDocumentsQuery => {
  return {
    filter: {
      userId: toObjectId(input.userId),
    },
    sort: {
      createdAt: -1,
    },
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

export const toDeleteBookmarkInput = (
  session: UserSessionRequired,
  params: DeleteBookmarkParams,
): DeleteBookmarkInput => {
  return {
    bookmarkId: params.bookmarkId,
    userId: session.user.id,
  }
}

export const toDeleteBookmarkDocumentQuery = (
  input: DeleteBookmarkInput,
): DeleteBookmarkDocumentQuery => {
  return {
    filter: {
      _id: toObjectId(input.bookmarkId),
      userId: toObjectId(input.userId),
    },
  }
}
