import { makeMongoCollectionRepository } from './infra/mongo/repositories/collection.mongo.repository'
import { makeCreateCollectionUseCase } from './use-cases/create-collection.use-case'
import { makeGetCollectionsUseCase } from './use-cases/get-collections.use-case'
import { makeGetCollectionUseCase } from './use-cases/get-collection.use-case'
import { makeUpdateCollectionUseCase } from './use-cases/update-collection.use-case'
import { makeDeleteCollectionUseCase } from './use-cases/delete-collection.use-case'

const collectionRepository = makeMongoCollectionRepository()

export const createCollection = makeCreateCollectionUseCase(collectionRepository)
export const getCollections = makeGetCollectionsUseCase(collectionRepository)
export const getCollection = makeGetCollectionUseCase(collectionRepository)
export const updateCollection = makeUpdateCollectionUseCase(collectionRepository)
export const deleteCollection = makeDeleteCollectionUseCase(collectionRepository)
