import type { Bookmark } from '../../shared/types/bookmark'
import type {
  GetBookmarkInput,
} from '../types/bookmark'
import {
  toBookmark,
  toFindBookmarkDocumentQuery,
} from '../mappers/bookmark.mapper'
import { bookmarkRepository } from '../repositories/bookmark.repository'

export const getBookmark = async (input: GetBookmarkInput): Promise<Bookmark> => {
  const bookmarkDocument = await bookmarkRepository.findOne(toFindBookmarkDocumentQuery(input))

  ensureResourceFound(bookmarkDocument, 'Bookmark not found')

  return toBookmark(bookmarkDocument)
}
