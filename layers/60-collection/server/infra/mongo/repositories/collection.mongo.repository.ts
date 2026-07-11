import { mapValueOr } from '@core/shared/utils/value'
import type { CollectionRepository } from '../../../ports/collection.repository.port'
import { toCollection } from '../mappers/collection.mongo.mapper'
import { toCreateCollectionData } from '../mappers/create-collection.mongo.mapper'
import { toFindCollectionsQuery } from '../mappers/get-collections.mongo.mapper'
import { toFindCollectionQuery } from '../mappers/get-collection.mongo.mapper'
import { toUpdateCollectionQuery } from '../mappers/update-collection.mongo.mapper'
import { toDeleteCollectionQuery } from '../mappers/delete-collection.mongo.mapper'
import { CollectionModel } from '../models/collection.mongo.model'

export const makeMongoCollectionRepository = (): CollectionRepository => {
  return {
    async createOne(input) {
      const data = toCreateCollectionData(input)
      const document = await CollectionModel.create(data)
      return toCollection(document)
    },

    async findMany(input) {
      const query = toFindCollectionsQuery(input)
      const documents = await CollectionModel
        .find(query.filter)
        .sort(query.sort)
        .exec()

      return documents.map(toCollection)
    },

    async findOne(input) {
      const query = toFindCollectionQuery(input)
      const document = await CollectionModel
        .findOne(query.filter)
        .exec()

      return mapValueOr(document, toCollection, null)
    },

    async updateOne(input) {
      const query = toUpdateCollectionQuery(input)
      const document = await CollectionModel
        .findOneAndUpdate(
          query.filter,
          query.update,
          query.options,
        )
        .exec()

      return mapValueOr(document, toCollection, null)
    },

    async deleteOne(input) {
      const query = toDeleteCollectionQuery(input)
      const document = await CollectionModel
        .findOneAndDelete(query.filter)
        .exec()

      return mapValueOr(document, toCollection, null)
    },
  }
}
