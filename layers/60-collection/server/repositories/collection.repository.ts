import type { Types } from 'mongoose'
import type { CreateCollectionRecordInput, CollectionDocument } from '@collection/server/types/collection'
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
}
