import type { CreateUserInput, User } from '@user/shared/types/user'
import { userRepository } from '@user/server/repositories/user.repository'
import { mapUser } from '@user/server/mappers/user.mapper'

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const userDocument = await userRepository.createOne(input)

  return mapUser(userDocument)
}

export const getUsers = async (): Promise<User[]> => {
  const userDocuments = await userRepository.getMany()

  return userDocuments.map(mapUser)
}
