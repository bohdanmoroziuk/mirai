import type { H3Event } from 'h3'
import type { z } from 'zod'

export const validateBody = async <TSchema extends z.ZodType>(
  event: H3Event,
  schema: TSchema,
): Promise<z.output<TSchema>> => {
  const dirtyBody = await readBody(event)
  const result = schema.safeParse(dirtyBody)

  invariant(
    result.success,
    400,
    'Validation error',
    {
      issues: result.error?.issues,
    },
  )

  return result.data
}
