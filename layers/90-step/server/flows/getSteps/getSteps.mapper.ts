export const toGetStepsInput = (
  userId: string,
  query: GetStepsQuery,
): GetStepsInput => {
  return {
    userId,
    caseId: query.caseId,
  }
}
