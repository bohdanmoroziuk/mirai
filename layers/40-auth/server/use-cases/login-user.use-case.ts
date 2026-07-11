import type { UserRepository } from '@user/server/ports/user.repository.port'
import type { AuthUser } from '../../shared/types/auth'
import type { LoginUserInput } from '../types/login-user.types'
import { toAuthUser } from '../mappers/auth.mapper'
import { ensureUserExists, ensurePasswordValid } from '../guards/auth.guard'

export const makeLoginUserUseCase = (userRepository: UserRepository) => {
  return async (input: LoginUserInput): Promise<AuthUser> => {
    const user = await userRepository.findOneByEmail({
      email: input.email,
    })

    ensureUserExists(user)

    const isPasswordValid = await verifyPassword(user.password, input.password)

    ensurePasswordValid(isPasswordValid)

    return toAuthUser(user)
  }
}
