import { makeMongoBookmarkRepository } from './infra/mongo/repositories/bookmark.mongo.repository'
import { makeCreateBookmarkUseCase } from './use-cases/create-bookmark.use-case'
import { makeDeleteBookmarkUseCase } from './use-cases/delete-bookmark.use-case'

const bookmarkRepository = makeMongoBookmarkRepository()

export const createBookmark = makeCreateBookmarkUseCase(bookmarkRepository)
export const deleteBookmark = makeDeleteBookmarkUseCase(bookmarkRepository)
