import type { Nullable } from '@core/shared/types/common'
import type {
  CollectionDocument,
  CreateOneCollectionInput,
  FindManyCollectionsInput,
  FindOneCollectionInput,
  DeleteOneCollectionInput,
  UpdateOneCollectionInput,
} from '@collection/server/types/collection'
import { CollectionModel } from '@collection/server/models/collection.model'

export const collectionRepository = {
  createOne(input: CreateOneCollectionInput): Promise<CollectionDocument> {
    return CollectionModel.create(input)
  },

  findMany(input: FindManyCollectionsInput): Promise<CollectionDocument[]> {
    return CollectionModel
      .find({ userId: input.userId })
      .exec()
  },

  findOne(input: FindOneCollectionInput): Promise<Nullable<CollectionDocument>> {
    return CollectionModel
      .findOne({
        _id: input.collectionId,
        userId: input.userId,
      })
      .exec()
  },

  updateOne(input: UpdateOneCollectionInput): Promise<Nullable<CollectionDocument>> {
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

  deleteOne(input: DeleteOneCollectionInput): Promise<Nullable<CollectionDocument>> {
    return CollectionModel
      .findOneAndDelete({
        _id: input.collectionId,
        userId: input.userId,
      })
      .exec()
  },
}
