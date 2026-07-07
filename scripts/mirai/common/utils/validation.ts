import type { z } from 'zod'
import { ValidationError } from '#mirai/common/errors/validation'

export const parseArgs = async<
  TArgs extends Record<string, unknown>,
  TSchema extends z.ZodType,
>(
  args: TArgs,
  schema: TSchema,
): Promise<z.output<TSchema>> => {
  const result = await schema.safeParseAsync(args)

  if (result.success) {
    return result.data
  }

  throw ValidationError.fromZodError(
    'Invalid command arguments',
    result.error,
  )
}
