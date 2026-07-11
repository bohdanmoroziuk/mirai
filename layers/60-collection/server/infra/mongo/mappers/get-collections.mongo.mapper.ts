import type { GetCollectionsInput } from '../../../types/get-collections.types'
import type { FindCollectionsQuery } from '../types/get-collections.mongo.types'

export const toFindCollectionsQuery = (
  input: GetCollectionsInput,
): FindCollectionsQuery => {
  return {
    filter: {
      userId: toObjectId(input.userId),
    },
    sort: {
      createdAt: -1,
    },
  }
}
