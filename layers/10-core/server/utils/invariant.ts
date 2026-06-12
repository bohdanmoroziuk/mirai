export const invariant = (
  condition: unknown,
  statusCode = 500,
  statusMessage = 'Something went wrong',
  data?: unknown,
): asserts condition => {
  if (!condition) {
    throw createError({
      statusCode,
      statusMessage,
      data,
    })
  }
}
