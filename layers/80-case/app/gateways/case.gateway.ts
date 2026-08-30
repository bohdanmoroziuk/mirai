export const caseGateway = {
  getOne(input: GetCaseInput) {
    return $fetch<ApiResponse<Case>>(`/api/cases/${input.params.caseId}`, {
      method: 'get',
    })
  },

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

  getStats() {
    return $fetch<ApiResponse<CaseStats>>('/api/cases/stats', {
      method: 'get',
    })
  },

  createOne(input: CreateCaseInput) {
    return $fetch<ApiResponse<Case>>('/api/cases', {
      method: 'post',
      body: input.body,
    })
  },

  updateOne(input: UpdateCaseInput) {
    return $fetch<ApiResponse<Case>>(`/api/cases/${input.params.caseId}`, {
      method: 'patch',
      body: input.body,
    })
  },

  deleteOne(input: DeleteCaseInput) {
    return $fetch<ApiResponse<DeleteCaseOutput>>(`/api/cases/${input.params.caseId}`, {
      method: 'delete',
    })
  },
}
