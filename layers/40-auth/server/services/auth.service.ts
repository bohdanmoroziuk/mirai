import { isNullish } from '@core/shared/utils/common'
import { HttpStatus } from '@core/shared/constants/http'
import { mapUser } from '@user/server/mappers/user.mapper'
import { createUser, getUserByEmail, getUserDocumentByEmail } from '@user/server/services/user.service'
import type { AuthUser } from '../../shared/types/auth'
import type { SignupUserInput, LoginUserInput } from '../types/auth'
import { mapAuthUser } from '../mappers/auth.mapper'

export const signupUser = async (input: SignupUserInput): Promise<AuthUser> => {
  const existingUser = await getUserByEmail(input.email)

  invariant(
    isNullish(existingUser),
    HttpStatus.CONFLICT,
    'User with this email already exists',
  )

  const passwordHash = await hashPassword(input.password)

  const user = await createUser({
    name: input.name,
    email: input.email,
    passwordHash,
  })

  const authUser = mapAuthUser(user)

  return authUser
}

export const loginUser = async (input: LoginUserInput): Promise<AuthUser> => {
  const userDocument = await getUserDocumentByEmail(input.email)

  invariant(
    isPresent(userDocument),
    HttpStatus.UNAUTHORIZED,
    'Invalid email or password',
  )

  const isPasswordValid = await verifyPassword(userDocument.passwordHash, input.password)

  invariant(
    isPasswordValid,
    HttpStatus.UNAUTHORIZED,
    'Invalid email or password',
  )

  const authUser = mapAuthUser(mapUser(userDocument))

  return authUser
}
