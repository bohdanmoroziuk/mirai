import { z } from 'zod'

export const getCaseStatsInputSchema = z.object({
  userId: z.string(),
})
