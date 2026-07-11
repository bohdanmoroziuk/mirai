import type { Nullable } from '@core/shared/types/common'
import type { GetUserByEmailInput } from '../types/get-user-by-email.types'
import type { CreateUserInput } from '../types/create-user.types'
import type { UserWithPassword } from '../types/user.types'

export interface UserRepository {
  findOneByEmail(input: GetUserByEmailInput): Promise<Nullable<UserWithPassword>>
  createOne(input: CreateUserInput): Promise<UserWithPassword>
}
