export const caseGateway = {
  getStats() {
    return $fetch<ApiResponse<CaseStats>>('/api/cases/stats', {
      method: 'get',
    })
  },
}
