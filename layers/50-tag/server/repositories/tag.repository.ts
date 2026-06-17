import type { TagDocument, CreateOneTagInput } from '@tag/server/types/tag'
import { TagModel } from '@tag/server/models/tag.model'

export const tagRepository = {
  createOne(input: CreateOneTagInput): Promise<TagDocument> {
    return TagModel.create(input)
  },
}
