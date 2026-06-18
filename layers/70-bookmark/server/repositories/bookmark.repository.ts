import type { BookmarkDocument, CreateBookmarkDocumentInput } from '@bookmark/server/types/bookmark'
import { BookmarkModel } from '@bookmark/server/models/bookmark.model'

export const bookmarkRepository = {
  createOne(input: CreateBookmarkDocumentInput): Promise<BookmarkDocument> {
    return BookmarkModel.create(input)
  },
}
