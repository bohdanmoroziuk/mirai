import type { Nullish } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

// raw user input/base shape, includes password
export type UserEntity = {
  name: string
  email: string
  password: string
  avatarUrl: Nullish<string>
}

// safe app user, no password
export type User
  = Omit<UserEntity, 'password'>
    & Entity
    & Timestamps

// registration/input before hashing
export type CreateUserInput = Pick<
  UserEntity,
  | 'name'
  | 'email'
  | 'password'
>
