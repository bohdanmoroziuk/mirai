import type { BookmarkDocument, CreateBookmarkDocumentInput, FindBookmarksDocumentsQuery } from '@bookmark/server/types/bookmark'
import { BookmarkModel } from '@bookmark/server/models/bookmark.model'

export const bookmarkRepository = {
  createOne(input: CreateBookmarkDocumentInput): Promise<BookmarkDocument> {
    return BookmarkModel.create(input)
  },

  findMany(query: FindBookmarksDocumentsQuery): Promise<BookmarkDocument[]> {
    return BookmarkModel
      .find(query.filter)
      .sort(query.sort)
      .exec()
  },
}
