import { compactObject } from '@core/shared/utils/object'
import { escapeRegExp } from '@core/shared/utils/regexp'
import type { GetTagsInput } from '../../../types/get-tags.types'
import type { FindTagsQuery } from '../types/get-tags.mongo.types'

export const toFindTagsQuery = (input: GetTagsInput): FindTagsQuery => {
  return {
    filter: compactObject({
      userId: toObjectId(input.userId),
      name: input.search
        ? {
            $regex: escapeRegExp(input.search),
            $options: 'i',
          }
        : undefined,
    }),
    sort: {
      createdAt: -1,
    },
  }
}
