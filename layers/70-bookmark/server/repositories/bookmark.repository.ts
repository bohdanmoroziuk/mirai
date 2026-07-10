import type { Nullable } from '@core/shared/types/common'
import type {
  BookmarkDocument,
  FindBookmarkDocumentQuery,
  FindBookmarksDocumentsQuery,
  UpdateBookmarkDocumentQuery,
} from '../types/bookmark'
import { BookmarkModel } from '../models/bookmark.model'

export const bookmarkRepository = {
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

  updateOne(query: UpdateBookmarkDocumentQuery): Promise<Nullable<BookmarkDocument>> {
    return BookmarkModel
      .findOneAndUpdate(
        query.filter,
        query.update,
        query.options,
      )
      .exec()
  },
}
