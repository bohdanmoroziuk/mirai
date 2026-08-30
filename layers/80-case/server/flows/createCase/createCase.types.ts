import type { z } from 'zod'
import type { createCaseBodySchema } from './createCase.schema'

export type CreateCaseBody = z.infer<typeof createCaseBodySchema>

export type CreateCaseInput = CreateCaseBody & {
  userId: string
}
