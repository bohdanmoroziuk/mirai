export const caseGateway = {
  createOne(input: CreateCaseInput) {
    return $fetch<ApiResponse<Case>>('/api/cases', {
      method: 'post',
      body: input.body,
    })
  },

  getStats() {
    return $fetch<ApiResponse<CaseStats>>('/api/cases/stats', {
      method: 'get',
    })
  },
}
