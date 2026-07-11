import { isNull, isNotNull } from '@core/shared/utils/common'
import { HttpStatus } from '@core/shared/constants/http'
import type { Nullable } from '@core/shared/types/common'
import type { UserWithPassword } from '@user/server/types/user.types'

export function ensureUserDoesNotExist(user: Nullable<UserWithPassword>): asserts user is null {
  invariant(
    isNull(user),
    HttpStatus.CONFLICT,
    'User with this email already exists',
  )
}

export function ensureUserExists(user: Nullable<UserWithPassword>): asserts user is UserWithPassword {
  invariant(
    isNotNull(user),
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
