import type { Nullable } from '@core/shared/types/common'
import type {
  BookmarkDocument,
  CreateBookmarkDocumentInput,
  DeleteBookmarkDocumentQuery,
  FindBookmarkDocumentQuery,
  FindBookmarksDocumentsQuery,
} from '@bookmark/server/types/bookmark'
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

  findOne(query: FindBookmarkDocumentQuery): Promise<Nullable<BookmarkDocument>> {
    return BookmarkModel
      .findOne(query.filter)
      .exec()
  },

  deleteOne(query: DeleteBookmarkDocumentQuery): Promise<Nullable<BookmarkDocument>> {
    return BookmarkModel
      .findOneAndDelete(query.filter)
      .exec()
  },
}
