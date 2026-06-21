import type { Nullable } from '@core/shared/types/common'
import type {
  CollectionDocument,
  CreateCollectionDocumentInput,
  FindCollectionDocumentsInput,
  FindCollectionDocumentInput,
  DeleteCollectionDocumentInput,
  UpdateCollectionDocumentInput,
} from '../types/collection'
import { CollectionModel } from '../models/collection.model'

export const collectionRepository = {
  createOne(input: CreateCollectionDocumentInput): Promise<CollectionDocument> {
    return CollectionModel.create(input)
  },

  findMany(input: FindCollectionDocumentsInput): Promise<CollectionDocument[]> {
    return CollectionModel
      .find({ userId: input.userId })
      .exec()
  },

  findOne(input: FindCollectionDocumentInput): Promise<Nullable<CollectionDocument>> {
    return CollectionModel
      .findOne({
        _id: input.collectionId,
        userId: input.userId,
      })
      .exec()
  },

  updateOne(input: UpdateCollectionDocumentInput): Promise<Nullable<CollectionDocument>> {
    return CollectionModel
      .findOneAndUpdate({
        _id: input.collectionId,
        userId: input.userId,
      }, {
        $set: {
          title: input.title,
        },
      }, {
        runValidators: true,
        returnDocument: 'after',
      })
      .exec()
  },

  deleteOne(input: DeleteCollectionDocumentInput): Promise<Nullable<CollectionDocument>> {
    return CollectionModel
      .findOneAndDelete({
        _id: input.collectionId,
        userId: input.userId,
      })
      .exec()
  },
}
