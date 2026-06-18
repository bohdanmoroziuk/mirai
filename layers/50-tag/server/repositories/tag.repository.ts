import type { TagDocument, CreateTagDocumentInput, FindManyTagDocumentsQuery, DeleteTagDocumentQuery } from '@tag/server/types/tag'
import { TagModel } from '@tag/server/models/tag.model'
import type { Nullable } from '~~/layers/10-core/shared/types/common'

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

  deleteOne(query: DeleteTagDocumentQuery): Promise<Nullable<TagDocument>> {
    return TagModel
      .findOneAndDelete(query.filter)
      .exec()
  },
}
