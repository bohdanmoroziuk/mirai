import { mapValueOr } from '@core/shared/utils/value'
import type { UserRepository } from '../../../ports/user.repository.port'
import { toUserWithPassword } from '../mappers/user.mongo.mapper'
import { toCreateUserData } from '../mappers/create-user.mongo.mapper'
import { toFindUserByEmailQuery } from '../mappers/find-user-by-email.mongo.mapper'
import { UserModel } from '../models/user.mongo.model'

export const makeMongoUserRepository = (): UserRepository => {
  return {
    async createOne(input) {
      const data = toCreateUserData(input)
      const document = await UserModel.create(data)
      return toUserWithPassword(document)
    },

    async findOneByEmail(input) {
      const query = toFindUserByEmailQuery(input)
      const document = await UserModel
        .findOne(query.filter)
        .exec()

      return mapValueOr(document, toUserWithPassword, null)
    },
  }
}
