import type { Collection } from '@collection/shared/types/collection'
import type {
  CreateCollectionInput,
  DeleteCollectionInput,
  DeleteCollectionOutput,
  GetCollectionInput,
  UpdateCollectionInput,
} from '@collection/server/types/collection'
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
  const collectionDocuments = await collectionRepository.findMany({
    userId: toObjectId(userId),
  })

  return collectionDocuments.map(mapCollection)
}

export const getCollection = async (input: GetCollectionInput): Promise<Nullable<Collection>> => {
  const collectionDocument = await collectionRepository.findOne({
    collectionId: toObjectId(input.collectionId),
    userId: toObjectId(input.userId),
  })

  invariant(
    isPresent(collectionDocument),
    404,
    'Collection not found',
  )

  return mapCollection(collectionDocument)
}

export const updateCollection = async (input: UpdateCollectionInput): Promise<Collection> => {
  const collectionDocument = await collectionRepository.updateOne({
    title: input.title,
    userId: toObjectId(input.userId),
    collectionId: toObjectId(input.collectionId),
  })

  invariant(
    isPresent(collectionDocument),
    404,
    'Collection not found',
  )

  return mapCollection(collectionDocument)
}

export const deleteCollection = async (input: DeleteCollectionInput): Promise<DeleteCollectionOutput> => {
  const collectionDocument = await collectionRepository.deleteOne({
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
