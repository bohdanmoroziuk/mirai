import { makeMongoBookmarkRepository } from './infra/mongo/repositories/bookmark.mongo.repository'
import { makeGetBookmarksUseCase } from './use-cases/get-bookmarks.use-case'
import { makeCreateBookmarkUseCase } from './use-cases/create-bookmark.use-case'
import { makeUpdateBookmarkUseCase } from './use-cases/update-bookmark.use-case'
import { makeDeleteBookmarkUseCase } from './use-cases/delete-bookmark.use-case'

const bookmarkRepository = makeMongoBookmarkRepository()

export const getBookmarks = makeGetBookmarksUseCase(bookmarkRepository)
export const createBookmark = makeCreateBookmarkUseCase(bookmarkRepository)
export const updateBookmark = makeUpdateBookmarkUseCase(bookmarkRepository)
export const deleteBookmark = makeDeleteBookmarkUseCase(bookmarkRepository)
