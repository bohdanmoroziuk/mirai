import type { CreateUserRecordInput, UserDocument } from '@user/server/types/user'
import { UserModel } from '@user/server/models/user.model'

export const userRepository = {
  createOne(input: CreateUserRecordInput): Promise<UserDocument> {
    return UserModel.create(input)
  },
}
