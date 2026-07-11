import type { UserRepository } from '@user/server/ports/user.repository.port'
import type { AuthUser } from '../../shared/types/auth'
import type { SignupUserInput } from '../types/signup-user.types'
import { toAuthUser } from '../mappers/auth.mapper'
import { ensureUserDoesNotExist } from '../guards/auth.guard'

export const makeSignupUserUseCase = (userRepository: UserRepository) => {
  return async (input: SignupUserInput): Promise<AuthUser> => {
    const existingUser = await userRepository.findOneByEmail({
      email: input.email,
    })

    ensureUserDoesNotExist(existingUser)

    const passwordHash = await hashPassword(input.password)

    const user = await userRepository.createOne({
      name: input.name,
      email: input.email,
      passwordHash,
    })

    return toAuthUser(user)
  }
}
