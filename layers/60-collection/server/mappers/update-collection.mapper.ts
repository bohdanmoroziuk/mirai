import type { CollectionParams } from '../types/collection-params.types'
import type { UpdateCollectionBody, UpdateCollectionInput } from '../types/update-collection.types'

export const toUpdateCollectionInput = (
  userId: string,
  params: CollectionParams,
  body: UpdateCollectionBody,
): UpdateCollectionInput => {
  return {
    userId,
    collectionId: params.collectionId,
    title: body.title,
  }
}
