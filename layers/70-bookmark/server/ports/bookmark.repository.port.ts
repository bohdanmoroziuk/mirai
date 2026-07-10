import type { Nullable } from '@core/shared/types/common'
import type { Bookmark } from '../../shared/types/bookmark'
import type { CreateBookmarkInput } from '../types/create-bookmark.types'
import type { DeleteBookmarkInput } from '../types/delete-bookmark.types'
import type { GetBookmarksInput } from '../types/get-bookmarks.types'

export interface BookmarkRepository {
  findMany(input: GetBookmarksInput): Promise<Bookmark[]>
  createOne(input: CreateBookmarkInput): Promise<Bookmark>
  deleteOne(input: DeleteBookmarkInput): Promise<Nullable<Bookmark>>
}
