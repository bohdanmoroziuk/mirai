import type { Nullish, Optional, Nullable, Falsy, Truthy } from '../../shared/types/common'

export const isUndefined = <T>(value: Optional<T>): value is undefined => {
  return value === undefined
}

export const isDefined = <T>(value: Optional<T>): value is T => {
  return value !== undefined
}

export const isNull = <T>(value: Nullable<T>): value is null => {
  return value === null
}

export const isNotNull = <T>(value: Nullable<T>): value is T => {
  return value !== null
}

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

export const isEmpty = (value: unknown) => {
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }

  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length === 0
  }

  return false
}
