import type { z } from 'zod'
import type { H3Event } from 'h3'
import { HttpStatus } from '@core/shared/constants/http'

function ensureValidResult<TSchema extends z.ZodType>(
  result: z.ZodSafeParseResult<z.output<TSchema>>,
): asserts result is z.ZodSafeParseSuccess<z.output<TSchema>> {
  invariant(
    result.success,
    HttpStatus.BAD_REQUEST,
    'Validation error',
    {
      issues: result.error?.issues,
    },
  )
}

export const validateBody = async <TSchema extends z.ZodType>(
  event: H3Event,
  schema: TSchema,
): Promise<z.output<TSchema>> => {
  const dirtyBody = await readBody(event)
  const result = schema.safeParse(dirtyBody)

  ensureValidResult(result)

  return result.data
}

export const validateParams = async <TSchema extends z.ZodType>(
  event: H3Event,
  schema: TSchema,
): Promise<z.output<TSchema>> => {
  const dirtyParams = getRouterParams(event)
  const result = schema.safeParse(dirtyParams)

  ensureValidResult(result)

  return result.data
}
