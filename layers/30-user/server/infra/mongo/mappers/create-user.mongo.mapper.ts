import type { CreateUserInput } from '../../../types/create-user.types'
import type { CreateUserData } from '../types/create-user.mongo.types'

export const toCreateUserData = (input: CreateUserInput): CreateUserData => {
  return {
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
  }
}
