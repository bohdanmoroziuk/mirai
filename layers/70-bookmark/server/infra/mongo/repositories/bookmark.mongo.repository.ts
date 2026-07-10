import type { BookmarkRepository } from '../../../ports/bookmark.repository.port'
import { toBookmark } from '../mappers/bookmark.mongo.mapper'
import { toCreateBookmarkData } from '../mappers/create-bookmark.mongo.mapper'
import { BookmarkModel } from '../models/bookmark.mongo.model'

export const makeMongoBookmarkRepository = (): BookmarkRepository => {
  return {
    async createOne(input) {
      const data = toCreateBookmarkData(input)
      const document = await BookmarkModel.create(data)
      return toBookmark(document)
    },
  }
}
