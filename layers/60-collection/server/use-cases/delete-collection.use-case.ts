import type { CollectionRepository } from '../ports/collection.repository.port'
import type { DeleteCollectionInput, DeleteCollectionOutput } from '../types/delete-collection.types'

export const makeDeleteCollectionUseCase = (collectionRepository: CollectionRepository) => {
  return async (input: DeleteCollectionInput): Promise<DeleteCollectionOutput> => {
    const collection = await collectionRepository.deleteOne(input)

    ensureResourceFound(collection, 'Collection not found')

    return {
      success: true,
    }
  }
}
