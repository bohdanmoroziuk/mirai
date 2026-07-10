import type { Bookmark } from '../../shared/types/bookmark'
import type { BookmarkRepository } from '../ports/bookmark.repository.port'
import type { GetBookmarksInput } from '../types/get-bookmarks.types'

export const makeGetBookmarksUseCase = (bookmarkRepository: BookmarkRepository) => {
  return async (input: GetBookmarksInput): Promise<Bookmark[]> => {
    return bookmarkRepository.findMany(input)
  }
}
