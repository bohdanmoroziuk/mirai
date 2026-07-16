import { useMutation } from '@tanstack/vue-query'
import { authKeys } from './auth.keys'
import { authRepository } from '../repositories/auth.repository'

export const useSignupMutation = () => {
  const userSession = useUserSession()

  return useMutation({
    mutationKey: authKeys.mutation('signup'),
    mutationFn: authRepository.signup,
    onSuccess: async () => {
      await userSession.fetch()
    },
  })
}

export const useLoginMutation = () => {
  const userSession = useUserSession()

  return useMutation({
    mutationKey: authKeys.mutation('login'),
    mutationFn: authRepository.login,
    onSuccess: async () => {
      await userSession.fetch()
    },
  })
}

export const useLogoutMutation = () => {
  const userSession = useUserSession()

  return useMutation({
    mutationKey: authKeys.mutation('logout'),
    mutationFn: authRepository.logout,
    onSuccess: async () => {
      await userSession.clear()
    },
  })
}
