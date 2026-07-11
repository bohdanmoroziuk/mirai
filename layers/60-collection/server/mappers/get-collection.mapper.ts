import type { CollectionParams } from '../types/collection-params.types'
import type { GetCollectionInput } from '../types/get-collection.types'

export const toGetCollectionInput = (
  userId: string,
  params: CollectionParams,
): GetCollectionInput => {
  return {
    userId,
    collectionId: params.collectionId,
  }
}
