export const caseGateway = {
  getMany() {
    return $fetch<ApiResponse<Case[]>>('/api/cases', {
      method: 'get',
    })
  },

  getOverviews() {
    return $fetch<ApiResponse<CaseOverview[]>>('/api/cases/overviews', {
      method: 'get',
    })
  },

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

  deleteOne(input: DeleteCaseInput) {
    return $fetch<ApiResponse<DeleteCaseOutput>>(`/api/cases/${input.params.caseId}`, {
      method: 'delete',
    })
  },
}
