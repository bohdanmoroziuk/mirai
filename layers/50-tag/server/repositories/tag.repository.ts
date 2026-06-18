import type { TagDocument, CreateTagDocumentInput, FindManyTagDocumentsQuery } from '@tag/server/types/tag'
import { TagModel } from '@tag/server/models/tag.model'

export const tagRepository = {
  createOne(input: CreateTagDocumentInput): Promise<TagDocument> {
    return TagModel.create(input)
  },

  findMany(query: FindManyTagDocumentsQuery): Promise<TagDocument[]> {
    return TagModel
      .find(query.filter)
      .sort(query.sort)
      .exec()
  },
}
