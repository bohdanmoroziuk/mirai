import type { H3Error } from 'h3'
import { FetchError } from 'ofetch'
import { isError as isH3Error } from 'h3'

export const isNativeError = (value: unknown): value is Error => {
  return value instanceof Error
}

export const isFetchError = (value: unknown): value is FetchError => {
  return value instanceof FetchError
}

export const getNativeErrorMessage = (
  error: Error,
  fallback = 'Something went wrong',
) => {
  return error.message || fallback
}

export const getFetchErrorMessage = (
  error: FetchError,
  fallback = 'Something went wrong',
) => {
  return (
    error.data?.data?.message
    || error.data?.message
    || error.statusMessage
    || error.message
    || fallback
  )
}

export const getH3ErrorMessage = <T = unknown>(
  error: H3Error<T>,
  fallback = 'Something went wrong',
) => {
  return (
    error.message
    || error.statusMessage
    || fallback
  )
}

export const getErrorMessage = (
  value: unknown,
  fallback = 'Something went wrong',
) => {
  if (isFetchError(value)) {
    return getFetchErrorMessage(value, fallback)
  }

  if (isH3Error(value)) {
    return getH3ErrorMessage(value, fallback)
  }

  if (isNativeError(value)) {
    return getNativeErrorMessage(value, fallback)
  }

  return fallback
}
