import type { BookmarkFields } from './bookmark.mongo.types'

export type CreateBookmarkData = Pick<
  BookmarkFields,
  | 'title'
  | 'description'
  | 'url'
  | 'isFavorite'
  | 'userId'
  | 'collectionId'
  | 'tagIds'
>
