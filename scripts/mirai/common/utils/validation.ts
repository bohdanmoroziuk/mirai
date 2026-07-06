import type { z } from 'zod'

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

  throw new Error('Validation error')
}
