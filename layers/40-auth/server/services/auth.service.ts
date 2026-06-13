import { isNullish } from '@core/shared/utils/common'
import { createUser, getUserByEmail } from '@user/server/services/user.service'
import type { SignupUserInput } from '@auth/server/types/auth'
import { mapAuthUser } from '@auth/server/mappers/auth.mapper'

export const signupUser = async (input: SignupUserInput) => {
  const existingUser = await getUserByEmail(input.email)

  console.log('existing user', existingUser)

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
