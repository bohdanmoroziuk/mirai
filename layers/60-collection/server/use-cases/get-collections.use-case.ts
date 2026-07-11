import type { Collection } from '../../shared/types/collection'
import type { CollectionRepository } from '../ports/collection.repository.port'
import type { GetCollectionsInput } from '../types/get-collections.types'

export const makeGetCollectionsUseCase = (collectionRepository: CollectionRepository) => {
  return async (input: GetCollectionsInput): Promise<Collection[]> => {
    return collectionRepository.findMany(input)
  }
}
