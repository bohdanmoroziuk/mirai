import type { z } from 'zod'

export type GetCaseStatsInput = z.infer<typeof getCaseStatsInputSchema>
