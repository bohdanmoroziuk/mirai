import type { GetCollectionInput } from '../../../types/get-collection.types'
import type { FindCollectionQuery } from '../types/get-collection.mongo.types'

export const toFindCollectionQuery = (
  input: GetCollectionInput,
): FindCollectionQuery => {
  return {
    filter: {
      _id: toObjectId(input.collectionId),
      userId: toObjectId(input.userId),
    },
  }
}
