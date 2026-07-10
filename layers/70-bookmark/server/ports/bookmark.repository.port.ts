import type { Bookmark } from '../../shared/types/bookmark'
import type { CreateBookmarkInput } from '../types/create-bookmark.types'

export interface BookmarkRepository {
  createOne(input: CreateBookmarkInput): Promise<Bookmark>
}
