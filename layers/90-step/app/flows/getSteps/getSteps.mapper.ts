export const toGetStepsInput = (caseId: string): GetStepsInput => {
  return {
    query: {
      caseId,
    },
  }
}
