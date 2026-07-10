import { mapValueOr } from '@core/shared/utils/value'
import type { BookmarkRepository } from '../../../ports/bookmark.repository.port'
import { toBookmark } from '../mappers/bookmark.mongo.mapper'
import { toFindBookmarksQuery } from '../mappers/get-bookmarks.mongo.mapper'
import { toCreateBookmarkData } from '../mappers/create-bookmark.mongo.mapper'
import { toUpdateBookmarkQuery } from '../mappers/update-bookmark.mongo.mapper'
import { toDeleteBookmarkQuery } from '../mappers/delete-bookmark.mongo.mapper'
import { BookmarkModel } from '../models/bookmark.mongo.model'

export const makeMongoBookmarkRepository = (): BookmarkRepository => {
  return {
    async createOne(input) {
      const data = toCreateBookmarkData(input)
      const document = await BookmarkModel.create(data)
      return toBookmark(document)
    },

    async findMany(input) {
      const query = toFindBookmarksQuery(input)
      const documents = await BookmarkModel
        .find(query.filter)
        .sort(query.sort)
        .exec()

      return documents.map(toBookmark)
    },

    async updateOne(input) {
      const query = toUpdateBookmarkQuery(input)
      const document = await BookmarkModel
        .findOneAndUpdate(
          query.filter,
          query.update,
          query.options,
        )
        .exec()

      return mapValueOr(document, toBookmark, null)
    },

    async deleteOne(input) {
      const query = toDeleteBookmarkQuery(input)
      const document = await BookmarkModel
        .findOneAndDelete(query.filter)
        .exec()

      return mapValueOr(document, toBookmark, null)
    },
  }
}
