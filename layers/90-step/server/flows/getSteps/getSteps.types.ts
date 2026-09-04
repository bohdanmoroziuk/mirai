import type { z } from 'zod'

export type GetStepsQuery = z.infer<typeof getStepsQuerySchema>

export type GetStepsInput = {
  userId: string
  caseId: string
}
