import type { Nullable } from '@core/shared/types/common'
import type { User } from '../../shared/types/user'
import type { GetUserByEmailInput } from '../types/get-user-by-email.types'
import type { CreateUserInput } from '../types/create-user.types'

export interface UserRepository {
  findOneByEmail(input: GetUserByEmailInput): Promise<Nullable<User>>
  createOne(input: CreateUserInput): Promise<User>
}
