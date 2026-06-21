import type { Nullable } from '@core/shared/types/common'
import type {
  TagDocument,
  CreateTagDocumentInput,
  FindManyTagDocumentsQuery,
  DeleteTagDocumentQuery,
  UpdateTagDocumentQuery,
} from '../types/tag'
import { TagModel } from '../models/tag.model'

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

  updateOne(query: UpdateTagDocumentQuery): Promise<Nullable<TagDocument>> {
    return TagModel
      .findOneAndUpdate(
        query.filter,
        query.update,
        query.options,
      )
      .exec()
  },
}
