import type { Bookmark } from '../../shared/types/bookmark'
import type { Nullable } from '@core/shared/types/common'
import type { CreateBookmarkInput } from '../types/create-bookmark.types'
import type { DeleteBookmarkInput } from '../types/delete-bookmark.types'

export interface BookmarkRepository {
  createOne(input: CreateBookmarkInput): Promise<Bookmark>
  deleteOne(input: DeleteBookmarkInput): Promise<Nullable<Bookmark>>
}
