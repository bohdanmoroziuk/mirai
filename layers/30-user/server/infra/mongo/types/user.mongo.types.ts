import type { HydratedDocument } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'

export type UserFields = {
  name: string
  email: string
  passwordHash: string
  avatarUrl: Nullish<string>
  updatedAt: Date
  createdAt: Date
}

export type UserDocument = HydratedDocument<UserFields>
