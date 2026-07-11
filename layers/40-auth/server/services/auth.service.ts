import { isNullish } from '@core/shared/utils/common'
import { HttpStatus } from '@core/shared/constants/http'
import { userRepository } from '@user/server/user.repository.container'
import type { AuthUser } from '../../shared/types/auth'
import type { SignupUserInput, LoginUserInput } from '../types/auth'
import { mapAuthUser } from '../mappers/auth.mapper'

export const signupUser = async (input: SignupUserInput): Promise<AuthUser> => {
  const existingUser = await userRepository.findOneByEmail({
    email: input.email,
  })

  invariant(
    isNullish(existingUser),
    HttpStatus.CONFLICT,
    'User with this email already exists',
  )

  const passwordHash = await hashPassword(input.password)

  const user = await userRepository.createOne({
    name: input.name,
    email: input.email,
    passwordHash,
  })

  const authUser = mapAuthUser(user)

  return authUser
}

export const loginUser = async (input: LoginUserInput): Promise<AuthUser> => {
  const userCredentials = await userRepository.findOneByEmail({
    email: input.email,
  })

  invariant(
    isPresent(userCredentials),
    HttpStatus.UNAUTHORIZED,
    'Invalid email or password',
  )

  const isPasswordValid = await verifyPassword(userCredentials.password, input.password)

  invariant(
    isPasswordValid,
    HttpStatus.UNAUTHORIZED,
    'Invalid email or password',
  )

  const authUser = mapAuthUser(userCredentials)

  return authUser
}
