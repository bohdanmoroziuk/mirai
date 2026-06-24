import type { Nullish, Falsy, Truthy } from '../../shared/types/common'

export const isPresent = <T>(value: Nullish<T>): value is T => {
  return value !== null && value !== undefined
}

export const isNullish = <T>(value: Nullish<T>): value is null | undefined => {
  return value === null || value === undefined
}

export const isTruthy = <T>(value: T): value is Truthy<T> => {
  return Boolean(value)
}

export const isFalsy = (value: unknown): value is Falsy => {
  return !value
}
