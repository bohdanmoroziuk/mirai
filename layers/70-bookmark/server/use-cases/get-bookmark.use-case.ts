import type { Bookmark } from '../../shared/types/bookmark'
import type { BookmarkRepository } from '../ports/bookmark.repository.port'
import type { GetBookmarkInput } from '../types/get-bookmark.types'

export const makeGetBookmarkUseCase = (bookmarkRepository: BookmarkRepository) => {
  return async (input: GetBookmarkInput): Promise<Bookmark> => {
    const bookmark = await bookmarkRepository.findOne(input)

    ensureResourceFound(bookmark, 'Bookmark not found')

    return bookmark
  }
}
