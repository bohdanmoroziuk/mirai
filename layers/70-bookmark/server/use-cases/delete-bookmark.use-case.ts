import type { BookmarkRepository } from '../ports/bookmark.repository.port'
import type { DeleteBookmarkInput, DeleteBookmarkOutput } from '../types/delete-bookmark.types'

export const makeDeleteBookmarkUseCase = (bookmarkRepository: BookmarkRepository) => {
  return async (input: DeleteBookmarkInput): Promise<DeleteBookmarkOutput> => {
    const bookmark = await bookmarkRepository.deleteOne(input)

    ensureResourceFound(bookmark, 'Bookmark not found')

    return {
      success: true,
    }
  }
}
