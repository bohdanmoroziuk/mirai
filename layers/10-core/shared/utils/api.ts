export const selectApiData = <T>(response: ApiResponse<T>): T => {
  return response.data
}

export const toApiResponse = <T>(data: T): ApiResponse<T> => {
  return { data }
}
