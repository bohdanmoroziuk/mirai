import type { z } from 'zod'
import type { getCaseStatsInputSchema } from './getCaseStats.schema'

export type GetCaseStatsInput = z.infer<typeof getCaseStatsInputSchema>
