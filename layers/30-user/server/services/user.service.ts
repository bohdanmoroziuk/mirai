import type { Nullable } from '@core/shared/types/common'
import type { User } from '../../shared/types/user'
import type { UserDocument, CreateUserInput } from '../types/user'
import { userRepository } from '../repositories/user.repository'
import { mapUser } from '../mappers/user.mapper'

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const userDocument = await userRepository.createOne(input)

  return mapUser(userDocument)
}

export const getUsers = async (): Promise<User[]> => {
  const userDocuments = await userRepository.getMany()

  return userDocuments.map(mapUser)
}

export const getUserByEmail = async (email: string): Promise<Nullable<User>> => {
  const userDocument = await userRepository.findOneByEmail(email)

  if (userDocument) {
    return mapUser(userDocument)
  }

  return null
}

export const getUserDocumentByEmail = async (email: string): Promise<Nullable<UserDocument>> => {
  const userDocument = await userRepository.findOneByEmail(email)

  return userDocument
}
