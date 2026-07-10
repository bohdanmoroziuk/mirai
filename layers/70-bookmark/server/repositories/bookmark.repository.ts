import type { Nullable } from '@core/shared/types/common'
import type {
  BookmarkDocument,
  FindBookmarkDocumentQuery,
  UpdateBookmarkDocumentQuery,
} from '../types/bookmark'
import { BookmarkModel } from '../models/bookmark.model'

export const bookmarkRepository = {
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
