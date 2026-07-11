import type { CollectionParams } from '../types/collection-params.types'
import type { DeleteCollectionInput } from '../types/delete-collection.types'

export const toDeleteCollectionInput = (
  userId: string,
  params: CollectionParams,
): DeleteCollectionInput => {
  return {
    userId,
    collectionId: params.collectionId,
  }
}
