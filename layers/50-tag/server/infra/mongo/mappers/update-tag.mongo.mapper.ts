import { compactObject } from '@core/shared/utils/object'
import type { UpdateTagInput } from '../../../types/update-tag.types'
import type { UpdateTagQuery } from '../types/update-tag.mongo.types'

export const toUpdateTagQuery = (input: UpdateTagInput): UpdateTagQuery => {
  return {
    filter: {
      _id: toObjectId(input.tagId),
      userId: toObjectId(input.userId),
    },
    update: {
      $set: compactObject({
        name: input.name,
        color: input.color,
      }),
    },
    options: {
      runValidators: true,
      returnDocument: 'after',
    },
  }
}
