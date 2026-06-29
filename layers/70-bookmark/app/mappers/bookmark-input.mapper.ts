import type { BookmarkFormState, CreateBookmarkInput, DeleteBookmarkInput, GetBookmarksInput, GetBookmarksQuery } from '../types/bookmark'

export const toGetBookmarksInput = (query: GetBookmarksQuery): GetBookmarksInput => {
  return {
    query: {
      collectionId: query.collectionId,
    },
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

export const toDeleteBookmarkInput = (bookmarkId: string): DeleteBookmarkInput => {
  return {
    params: {
      bookmarkId,
    },
  }
}
