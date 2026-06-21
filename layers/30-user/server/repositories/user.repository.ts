import type { Nullable } from '@core/shared/types/common'
import type { CreateUserDocumentInput, UserDocument } from '../types/user'
import { UserModel } from '../models/user.model'

export const userRepository = {
  createOne(input: CreateUserDocumentInput): Promise<UserDocument> {
    return UserModel.create(input)
  },

  getMany(): Promise<UserDocument[]> {
    return UserModel
      .find()
      .exec()
  },

  findOneByEmail(email: string): Promise<Nullable<UserDocument>> {
    return UserModel
      .findOne({ email })
      .exec()
  },
}
