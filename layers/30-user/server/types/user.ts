import type { HydratedDocument } from 'mongoose'

export type UserSchema = {
  name: string
  email: string
  passwordHash: string
  avatarUrl: Nullish<string>
  updatedAt: Date
  createdAt: Date
}

export type UserDocument = HydratedDocument<UserSchema>

export type CreateUserInput = {
  name: string
  email: string
  passwordHash: string
}

export type CreateUserDocumentInput = {
  name: string
  email: string
  passwordHash: string
}
