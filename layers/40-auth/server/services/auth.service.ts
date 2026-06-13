import { isNullish } from '@core/shared/utils/common'
import { mapUser } from '@user/server/mappers/user.mapper'
import { createUser, getUserByEmail, getUserDocumentByEmail } from '@user/server/services/user.service'
import type { AuthUser } from '@auth/shared/types/auth'
import type { SignupUserInput, LoginUserInput } from '@auth/server/types/auth'
import { mapAuthUser } from '@auth/server/mappers/auth.mapper'

export const signupUser = async (input: SignupUserInput): Promise<AuthUser> => {
  const existingUser = await getUserByEmail(input.email)

  invariant(
    isNullish(existingUser),
    409,
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
    401,
    'Invalid email or password',
  )

  const isPasswordValid = await verifyPassword(userDocument.passwordHash, input.password)

  invariant(
    isPasswordValid,
    401,
    'Invalid email or password',
  )

  const authUser = mapAuthUser(mapUser(userDocument))

  return authUser
}
