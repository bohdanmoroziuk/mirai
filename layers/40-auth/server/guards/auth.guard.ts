import { isNullish } from '@core/shared/utils/common'
import { HttpStatus } from '@core/shared/constants/http'
import type { Nullish } from '@core/shared/types/common'
import type { UserWithPassword } from '~~/layers/30-user/server/types/user.types'

export function ensureUserDoesNotExist(user: Nullish<UserWithPassword>): asserts user is null | undefined {
  invariant(
    isNullish(user),
    HttpStatus.CONFLICT,
    'User with this email already exists',
  )
}

export function ensureUserExists(user: Nullish<UserWithPassword>): asserts user is UserWithPassword {
  invariant(
    isPresent(user),
    HttpStatus.UNAUTHORIZED,
    'Invalid email or password',
  )
}

export function ensurePasswordValid(isValid: boolean): asserts isValid {
  invariant(
    isValid,
    HttpStatus.UNAUTHORIZED,
    'Invalid email or password',
  )
}
