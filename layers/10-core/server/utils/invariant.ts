import { type HttpStatusCode, HttpStatus } from '@core/shared/constants/http'

export function invariant(
  condition: unknown,
  statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  statusMessage = 'Something went wrong',
  data?: Record<string, unknown>,
): asserts condition {
  if (!condition) {
    throw createError({
      statusCode,
      statusMessage,
      data,
    })
  }
}
