import type { UserFields } from './user.mongo.types'

export type CreateUserData = Pick<
  UserFields,
  | 'name'
  | 'email'
  | 'passwordHash'
>
