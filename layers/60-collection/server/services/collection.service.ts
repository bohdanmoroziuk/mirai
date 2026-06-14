import type { Collection } from '@collection/shared/types/collection'
import type { CreateCollectionInput } from '@collection/server/types/collection'
import { collectionRepository } from '@collection/server/repositories/collection.repository'
import { mapCollection } from '@collection/server/mappers/collection.mapper'

export const createCollection = async (input: CreateCollectionInput): Promise<Collection> => {
  const collectionDocument = await collectionRepository.createOne({
    title: input.title,
    userId: toObjectId(input.userId),
    parentId: toNullableObjectId(input.parentId),
  })

  return mapCollection(collectionDocument)
}

export const getUserCollections = async (userId: string): Promise<Collection[]> => {
  const collectionDocuments = await collectionRepository.findManyByUserId(toObjectId(userId))

  return collectionDocuments.map(mapCollection)
}
