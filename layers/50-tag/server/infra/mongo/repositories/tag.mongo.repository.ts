import { mapValueOr } from '@core/shared/utils/value'
import type { TagRepository } from '../../../ports/tag.repository.port'
import { toTag } from '../mappers/tag.mongo.mapper'
import { toFindTagsQuery } from '../mappers/get-tags.mongo.mapper'
import { toCreateTagData } from '../mappers/create-tag.mongo.mapper'
import { toUpdateTagQuery } from '../mappers/update-tag.mongo.mapper'
import { toDeleteTagQuery } from '../mappers/delete-tag.mongo.mapper'
import { TagModel } from '../models/tag.mongo.model'

export const makeMongoTagRepository = (): TagRepository => {
  return {
    async createOne(input) {
      const data = toCreateTagData(input)
      const document = await TagModel.create(data)
      return toTag(document)
    },

    async findMany(input) {
      const query = toFindTagsQuery(input)
      const documents = await TagModel
        .find(query.filter)
        .sort(query.sort)
        .exec()

      return documents.map(toTag)
    },

    async updateOne(input) {
      const query = toUpdateTagQuery(input)
      const document = await TagModel
        .findOneAndUpdate(
          query.filter,
          query.update,
          query.options,
        )
        .exec()

      return mapValueOr(document, toTag, null)
    },

    async deleteOne(input) {
      const query = toDeleteTagQuery(input)
      const document = await TagModel
        .findOneAndDelete(query.filter)
        .exec()

      return mapValueOr(document, toTag, null)
    },
  }
}
