import type { ApiResponse } from '@core/shared/types/api'
import type { AuthUser } from '../../shared/types/auth'
import type { SignupInput, LoginInput, LogoutOutput } from '../types/auth'

export const authRepository = {
  signup(input: SignupInput) {
    return $fetch <ApiResponse<AuthUser>>('/api/auth/signup', {
      method: 'post',
      body: input,
    })
  },

  login(input: LoginInput) {
    return $fetch<ApiResponse<AuthUser>>('/api/auth/login', {
      method: 'post',
      body: input,
    })
  },

  logout() {
    return $fetch<ApiResponse<LogoutOutput>>('/api/auth/logout', {
      method: 'post',
    })
  },
}
