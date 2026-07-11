import type { Collection } from '../../shared/types/collection'
import type { CollectionRepository } from '../ports/collection.repository.port'
import type { CreateCollectionInput } from '../types/create-collection.types'

export const makeCreateCollectionUseCase = (collectionRepository: CollectionRepository) => {
  return async (input: CreateCollectionInput): Promise<Collection> => {
    return collectionRepository.createOne(input)
  }
}
