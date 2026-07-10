import type { Bookmark } from '../../shared/types/bookmark'

export type CreateBookmarkInput = Pick<
  Bookmark,
  | 'title'
  | 'description'
  | 'url'
  | 'isFavorite'
  | 'userId'
  | 'collectionId'
  | 'tagIds'
>
