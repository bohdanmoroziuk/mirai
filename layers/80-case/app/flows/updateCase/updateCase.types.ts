export type UpdateCaseInput = {
  params: {
    caseId: string
  }
  body: {
    title: string
    description: string
  }
}
