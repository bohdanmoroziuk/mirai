import type { GetCaseStatsInput } from './getCaseStats.types'

export const toGetCaseStatsInput = (userId: string): GetCaseStatsInput => ({
  userId,
})
