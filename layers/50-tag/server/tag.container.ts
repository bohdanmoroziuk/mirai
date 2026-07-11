import { makeMongoTagRepository } from './infra/mongo/repositories/tag.mongo.repository'
import { makeGetTagsUseCase } from './use-cases/get-tags.use-case'
import { makeCreateTagUseCase } from './use-cases/create-tag.use-case'
import { makeUpdateTagUseCase } from './use-cases/update-tag.use-case'
import { makeDeleteTagUseCase } from './use-cases/delete-tag.use-case'

const tagRepository = makeMongoTagRepository()

export const getTags = makeGetTagsUseCase(tagRepository)
export const createTag = makeCreateTagUseCase(tagRepository)
export const updateTag = makeUpdateTagUseCase(tagRepository)
export const deleteTag = makeDeleteTagUseCase(tagRepository)
