import type { Collection } from '@collection/shared/types/collection'
import type { CreateCollectionInput, DeleteCollectionInput, DeleteCollectionOutput } from '@collection/server/types/collection'
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

export const getCollections = async (userId: string): Promise<Collection[]> => {
  const collectionDocuments = await collectionRepository.findManyByUserId(toObjectId(userId))

  return collectionDocuments.map(mapCollection)
}

export const deleteCollection = async (input: DeleteCollectionInput): Promise<DeleteCollectionOutput> => {
  const collectionDocument = await collectionRepository.deleteOneById({
    collectionId: toObjectId(input.collectionId),
    userId: toObjectId(input.userId),
  })

  invariant(
    isPresent(collectionDocument),
    404,
    'Collection not found',
  )

  return { success: true }
}
