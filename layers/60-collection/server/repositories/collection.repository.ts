import type { Types } from 'mongoose'
import type { Nullable } from '@core/shared/types/common'
import type { CreateCollectionRecordInput, DeleteCollectionRecordInput, CollectionDocument } from '@collection/server/types/collection'
import { CollectionModel } from '@collection/server/models/collection.model'

export const collectionRepository = {
  createOne(input: CreateCollectionRecordInput): Promise<CollectionDocument> {
    return CollectionModel.create(input)
  },

  findManyByUserId(userId: Types.ObjectId): Promise<CollectionDocument[]> {
    return CollectionModel
      .find({ userId })
      .exec()
  },

  deleteOneById(input: DeleteCollectionRecordInput): Promise<Nullable<CollectionDocument>> {
    return CollectionModel
      .findOneAndDelete({
        _id: input.collectionId,
        userId: input.userId,
      })
      .exec()
  },
}
