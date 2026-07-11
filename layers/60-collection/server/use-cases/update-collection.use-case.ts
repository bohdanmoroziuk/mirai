import type { Collection } from '../../shared/types/collection'
import type { CollectionRepository } from '../ports/collection.repository.port'
import type { UpdateCollectionInput } from '../types/update-collection.types'

export const makeUpdateCollectionUseCase = (collectionRepository: CollectionRepository) => {
  return async (input: UpdateCollectionInput): Promise<Collection> => {
    const collection = await collectionRepository.updateOne(input)

    ensureResourceFound(collection, 'Collection not found')

    return collection
  }
}
