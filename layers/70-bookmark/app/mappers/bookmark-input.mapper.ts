import type { BookmarkFormState, CreateBookmarkInput, DeleteBookmarkInput, GetBookmarkInput, GetBookmarksInput, BookmarksQuery, UpdateBookmarkInput } from '../types/bookmark'

export const toGetBookmarkInput = (bookmarkId: string): GetBookmarkInput => {
  return {
    params: {
      bookmarkId,
    },
  }
}

export const toGetBookmarksInput = (query: BookmarksQuery): GetBookmarksInput => {
  return {
    query: compactObject({
      collectionId: query.collectionId,
    }),
  }
}

export const toCreateBookmarkInput = (state: BookmarkFormState): CreateBookmarkInput => {
  return {
    body: {
      title: state.title,
      description: state.description,
      url: state.url,
      isFavorite: state.isFavorite,
      collectionId: state.collectionId,
      tagIds: state.tagIds,
    },
  }
}

export const toUpdateBookmarkInput = (bookmarkId: string, state: BookmarkFormState): UpdateBookmarkInput => {
  return {
    params: {
      bookmarkId,
    },
    body: {
      title: state.title,
      description: state.description,
      url: state.url,
      isFavorite: state.isFavorite,
      collectionId: state.collectionId,
      tagIds: state.tagIds,
    },
  }
}

export const toDeleteBookmarkInput = (bookmarkId: string): DeleteBookmarkInput => {
  return {
    params: {
      bookmarkId,
    },
  }
}
