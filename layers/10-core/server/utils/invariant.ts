export function invariant(
  condition: unknown,
  statusCode = 500,
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
