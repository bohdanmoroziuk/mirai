import type { ApiResponse } from '@core/shared/types/api'
import type { AuthUser } from '@auth/shared/types/auth'
import type { SignupInput } from '@auth/app/types/auth'

export const authRepository = {
  signup(input: SignupInput) {
    return $fetch <ApiResponse<AuthUser>>('/api/auth/signup', {
      method: 'post',
      body: input,
    })
  },
}
