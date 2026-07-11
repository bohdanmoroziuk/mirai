import type { UpdateCollectionInput } from '../../../types/update-collection.types'
import type { UpdateCollectionQuery } from '../types/update-collection.mongo.types'

export const toUpdateCollectionQuery = (
  input: UpdateCollectionInput,
): UpdateCollectionQuery => {
  return {
    filter: {
      _id: toObjectId(input.collectionId),
      userId: toObjectId(input.userId),
    },
    update: {
      $set: {
        title: input.title,
      },
    },
    options: {
      runValidators: true,
      returnDocument: 'after',
    },
  }
}
