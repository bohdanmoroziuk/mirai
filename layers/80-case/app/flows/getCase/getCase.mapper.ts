export const toGetCaseInput = (caseId: string): GetCaseInput => {
  return {
    params: {
      caseId,
    },
  }
}
