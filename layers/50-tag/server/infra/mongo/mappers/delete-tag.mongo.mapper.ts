import type { DeleteTagInput } from '../../../types/delete-tag.types'
import type { DeleteTagQuery } from '../types/delete-tag.mongo.types'

export const toDeleteTagQuery = (input: DeleteTagInput): DeleteTagQuery => {
  return {
    filter: {
      _id: toObjectId(input.tagId),
      userId: toObjectId(input.userId),
    },
  }
}
