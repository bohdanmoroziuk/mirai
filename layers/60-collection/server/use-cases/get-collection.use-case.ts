import type { Collection } from '../../shared/types/collection'
import type { CollectionRepository } from '../ports/collection.repository.port'
import type { GetCollectionInput } from '../types/get-collection.types'

export const makeGetCollectionUseCase = (collectionRepository: CollectionRepository) => {
  return async (input: GetCollectionInput): Promise<Collection> => {
    const collection = await collectionRepository.findOne(input)

    ensureResourceFound(collection, 'Collection not found')

    return collection
  }
}
