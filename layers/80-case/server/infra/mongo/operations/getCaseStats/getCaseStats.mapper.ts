import type { GetCaseStatsInput } from '../../../../flows/getCaseStats'

export const toGetCaseStatsQuery = (input: GetCaseStatsInput): GetCaseStatsQuery => ({
  filter: {
    userId: toObjectId(input.userId),
  },
})
