import type { Nullish } from '@core/shared/types/common'

export const isPresent = <T>(value: Nullish<T>): value is T => {
  return value !== null && value !== undefined
}
