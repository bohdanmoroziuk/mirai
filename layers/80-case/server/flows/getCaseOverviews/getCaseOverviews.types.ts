import type { z } from 'zod'

export type GetCaseOverviewsInput = z.infer<typeof getCaseOverviewsInputSchema>

export type CaseOverview = Case
