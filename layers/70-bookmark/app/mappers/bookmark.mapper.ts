import type { BookmarkFormState } from '../types/bookmark'

export const getBookmarkFormInitialState = (): BookmarkFormState => {
  return {
    title: '',
    description: '',
    url: '',
    isFavorite: false,
    collectionId: undefined,
    tagIds: [],
  }
}

export const toBookmarkFormState = (bookmark: Bookmark): BookmarkFormState => {
  return {
    title: bookmark.title,
    description: bookmark.description ?? '',
    url: bookmark.url,
    isFavorite: bookmark.isFavorite,
    collectionId: bookmark.collectionId ?? undefined,
    tagIds: bookmark.tagIds,
  }
}
