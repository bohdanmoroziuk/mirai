import type { Bookmark } from '@bookmark/shared/types/bookmark'
import type {
  CreateBookmarkInput,
  DeleteBookmarkInput,
  DeleteBookmarkOutput,
  GetBookmarkInput,
  GetBookmarksInput,
  UpdateBookmarkInput,
} from '@bookmark/server/types/bookmark'
import {
  toBookmark,
  toCreateBookmarkDocumentInput,
  toDeleteBookmarkDocumentQuery,
  toFindBookmarkDocumentQuery,
  toFindBookmarkDocumentsQuery,
  toUpdateBookmarkDocumentQuery,
} from '@bookmark/server/mappers/bookmark.mapper'
import { bookmarkRepository } from '@bookmark/server/repositories/bookmark.repository'

export const createBookmark = async (input: CreateBookmarkInput): Promise<Bookmark> => {
  const bookmarkDocument = await bookmarkRepository.createOne(toCreateBookmarkDocumentInput(input))

  return toBookmark(bookmarkDocument)
}

export const getBookmarks = async (input: GetBookmarksInput): Promise<Bookmark[]> => {
  const bookmarkDocuments = await bookmarkRepository.findMany(toFindBookmarkDocumentsQuery(input))

  return bookmarkDocuments.map(toBookmark)
}

export const getBookmark = async (input: GetBookmarkInput): Promise<Bookmark> => {
  const bookmarkDocument = await bookmarkRepository.findOne(toFindBookmarkDocumentQuery(input))

  ensureResourceFound(bookmarkDocument, 'Bookmark not found')

  return toBookmark(bookmarkDocument)
}

export const deleteBookmark = async (input: DeleteBookmarkInput): Promise<DeleteBookmarkOutput> => {
  const bookmarkDocument = await bookmarkRepository.deleteOne(toDeleteBookmarkDocumentQuery(input))

  ensureResourceFound(bookmarkDocument, 'Bookmark not found')

  return { success: true }
}

export const updateBookmark = async (input: UpdateBookmarkInput): Promise<Bookmark> => {
  const bookmarkDocument = await bookmarkRepository.updateOne(toUpdateBookmarkDocumentQuery(input))

  ensureResourceFound(bookmarkDocument, 'Bookmark not found')

  return toBookmark(bookmarkDocument)
}
