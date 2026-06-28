export const selectApiData = <T>(response: ApiResponse<T>): T => {
  return response.data
}

export const toApiResponse = <T>(data: T): ApiResponse<T> => {
  return { data }
}

export const compactQuery = <T extends Record<string, unknown>>(query: T) => {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined),
  ) as Partial<T>
}
