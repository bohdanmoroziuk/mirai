import type { Nullable } from '@core/shared/types/common'
import type { Bookmark } from '../../shared/types/bookmark'
import type { GetBookmarksInput } from '../types/get-bookmarks.types'
import type { CreateBookmarkInput } from '../types/create-bookmark.types'
import type { UpdateBookmarkInput } from '../types/update-bookmark.types'
import type { DeleteBookmarkInput } from '../types/delete-bookmark.types'

export interface BookmarkRepository {
  findMany(input: GetBookmarksInput): Promise<Bookmark[]>
  createOne(input: CreateBookmarkInput): Promise<Bookmark>
  updateOne(input: UpdateBookmarkInput): Promise<Nullable<Bookmark>>
  deleteOne(input: DeleteBookmarkInput): Promise<Nullable<Bookmark>>
}
