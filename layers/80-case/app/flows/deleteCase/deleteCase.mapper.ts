export const toDeleteCaseInput = (caseId: string): DeleteCaseInput => {
  return {
    params: {
      caseId,
    },
  }
}
