export const stepGateway = {
  getMany(input: GetStepsInput) {
    return $fetch<ApiResponse<Step[]>>('/api/steps', {
      method: 'get',
      query: input.query,
    })
  },
}
