import type { GetCaseStatsInput } from '../../../../flows/getCaseStats/getCaseStats.types'
import type { GetCaseStatsQuery } from './getCaseStats.types'

export const toGetCaseStatsQuery = (input: GetCaseStatsInput): GetCaseStatsQuery => ({
  filter: {
    userId: toObjectId(input.userId),
  },
})
