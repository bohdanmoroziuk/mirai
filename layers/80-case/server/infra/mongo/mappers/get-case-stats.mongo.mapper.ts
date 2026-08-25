import type { GetCaseStatsInput } from '../../../types/get-case-stats.types'
import type { GetCaseStatsQuery } from '../types/get-case-stats.mongo.types'

export const toGetCaseStatsQuery = (input: GetCaseStatsInput): GetCaseStatsQuery => ({
  filter: {
    userId: toObjectId(input.userId),
  },
})
