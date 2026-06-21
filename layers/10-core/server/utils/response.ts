import type { ApiResponse } from '../../shared/types/api'

export const createResponse = <T>(data: T): ApiResponse<T> => {
  return {
    data,
  }
}
