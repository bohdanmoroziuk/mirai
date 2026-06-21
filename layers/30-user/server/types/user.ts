import type { HydratedDocument } from 'mongoose'
import type { Timestamps } from '@core/shared/types/entity'
import type { UserEntity } from '../../shared/types/user'

// database shape, includes passwordHash
export type UserRecord = Omit<UserEntity, 'password'> & {
  passwordHash: string
}

export type UserSchema = UserRecord & Timestamps

// hydrated Mongoose document with timestamps
export type UserDocument = HydratedDocument<UserSchema>

// persistence input after hashing
export type CreateUserRecordInput = Pick<
  UserRecord,
  | 'name'
  | 'email'
  | 'passwordHash'
>
