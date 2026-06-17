import type { TagDocument, CreateOneTagInput, FindManyTagsInput } from '@tag/server/types/tag'
import { TagModel } from '@tag/server/models/tag.model'

export const tagRepository = {
  createOne(input: CreateOneTagInput): Promise<TagDocument> {
    return TagModel.create(input)
  },

  findMany(input: FindManyTagsInput): Promise<TagDocument[]> {
    return TagModel
      .find({
        userId: input.userId,
      })
      .sort({
        createdAt: -1,
      })
      .exec()
  },
}
