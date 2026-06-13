import type { ApiResponse } from '@core/shared/types/api'

export const createResponse = <T>(data: T): ApiResponse<T> => {
  return {
    data,
  }
}
