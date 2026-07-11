import type { Bookmark } from '../../shared/types/bookmark'
import type { BookmarkRepository } from '../ports/bookmark.repository.port'
import type { UpdateBookmarkInput } from '../types/update-bookmark.types'

export const makeUpdateBookmarkUseCase = (bookmarkRepository: BookmarkRepository) => {
  return async (input: UpdateBookmarkInput): Promise<Bookmark> => {
    const bookmark = await bookmarkRepository.updateOne(input)

    ensureResourceFound(bookmark, 'Bookmark not found')

    return bookmark
  }
}
