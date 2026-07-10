import type { Bookmark } from '../../shared/types/bookmark'
import type { BookmarkRepository } from '../ports/bookmark.repository.port'
import type { CreateBookmarkInput } from '../types/create-bookmark.types'

export const makeCreateBookmarkUseCase = (bookmarkRepository: BookmarkRepository) => {
  return async (input: CreateBookmarkInput): Promise<Bookmark> => {
    return bookmarkRepository.createOne(input)
  }
}
