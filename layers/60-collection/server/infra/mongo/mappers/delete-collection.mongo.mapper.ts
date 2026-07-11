import type { DeleteCollectionInput } from '../../../types/delete-collection.types'
import type { DeleteCollectionQuery } from '../types/delete-collection.mongo.types'

export const toDeleteCollectionQuery = (
  input: DeleteCollectionInput,
): DeleteCollectionQuery => {
  return {
    filter: {
      _id: toObjectId(input.collectionId),
      userId: toObjectId(input.userId),
    },
  }
}
