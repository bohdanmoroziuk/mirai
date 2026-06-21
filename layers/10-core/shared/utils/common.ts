import type { Nullish } from '../../shared/types/common'

export const isPresent = <T>(value: Nullish<T>): value is T => {
  return value !== null && value !== undefined
}

export const isNullish = <T>(value: Nullish<T>): value is null | undefined => {
  return value === null || value === undefined
}
