export const toGetCaseStatsQuery = (input: GetCaseStatsInput): GetCaseStatsQuery => ({
  filter: {
    userId: toObjectId(input.userId),
  },
})
