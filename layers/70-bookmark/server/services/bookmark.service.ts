import type { Bookmark } from '../../shared/types/bookmark'
import type {
  GetBookmarkInput,
  GetBookmarksInput,
  UpdateBookmarkInput,
} from '../types/bookmark'
import {
  toBookmark,
  toFindBookmarkDocumentQuery,
  toFindBookmarkDocumentsQuery,
  toUpdateBookmarkDocumentQuery,
} from '../mappers/bookmark.mapper'
import { bookmarkRepository } from '../repositories/bookmark.repository'

export const getBookmarks = async (input: GetBookmarksInput): Promise<Bookmark[]> => {
  const bookmarkDocuments = await bookmarkRepository.findMany(toFindBookmarkDocumentsQuery(input))

  return bookmarkDocuments.map(toBookmark)
}

export const getBookmark = async (input: GetBookmarkInput): Promise<Bookmark> => {
  const bookmarkDocument = await bookmarkRepository.findOne(toFindBookmarkDocumentQuery(input))

  ensureResourceFound(bookmarkDocument, 'Bookmark not found')

  return toBookmark(bookmarkDocument)
}

export const updateBookmark = async (input: UpdateBookmarkInput): Promise<Bookmark> => {
  const bookmarkDocument = await bookmarkRepository.updateOne(toUpdateBookmarkDocumentQuery(input))

  ensureResourceFound(bookmarkDocument, 'Bookmark not found')

  return toBookmark(bookmarkDocument)
}
