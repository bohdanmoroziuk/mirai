import type { Bookmark } from '@bookmark/shared/types/bookmark'
import type { CreateBookmarkInput } from '@bookmark/server/types/bookmark'
import { toBookmark, toCreateBookmarkDocumentInput } from '@bookmark/server/mappers/bookmark.mapper'
import { bookmarkRepository } from '@bookmark/server/repositories/bookmark.repository'

export const createBookmark = async (input: CreateBookmarkInput): Promise<Bookmark> => {
  const bookmarkDocument = await bookmarkRepository.createOne(toCreateBookmarkDocumentInput(input))

  return toBookmark(bookmarkDocument)
}
