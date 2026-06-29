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

export const getHostname = (url: string) => {
  return new URL(url).hostname
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
