import { HttpStatus } from '@core/shared/constants/http'
import type { Bookmark } from '@bookmark/shared/types/bookmark'
import type { CreateBookmarkInput, GetBookmarkInput, GetBookmarksInput } from '@bookmark/server/types/bookmark'
import { toBookmark, toCreateBookmarkDocumentInput, toFindBookmarkDocumentQuery, toFindBookmarkDocumentsQuery } from '@bookmark/server/mappers/bookmark.mapper'
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

  invariant(
    isPresent(bookmarkDocument),
    HttpStatus.NOT_FOUND,
    'Bookmark not found',
  )

  return toBookmark(bookmarkDocument)
}
