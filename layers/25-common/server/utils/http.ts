import type { Nullish } from '@core/shared/types/common'
import { HttpStatus } from '@core/shared/constants/http'

export const ensureResourceFound = <TValue>(
  value: Nullish<TValue>,
  message = 'Resource not found',
): asserts value is TValue => {
  invariant(
    isPresent(value),
    HttpStatus.NOT_FOUND,
    message,
  )
}
