import type { GetCaseStatsInput } from '../types/get-case-stats.types'

export const toGetCaseStatsInput = (userId: string): GetCaseStatsInput => ({
  userId,
})
