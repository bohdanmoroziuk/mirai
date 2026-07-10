import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { authRepository } from '../repositories/auth.repository'

export const useSignupMutation = () => {
  const queryClient = useQueryClient()
  const userSession = useUserSession()

  return useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: authRepository.signup,
    onSuccess: async () => {
      await userSession.fetch()
      await queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const userSession = useUserSession()

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: authRepository.login,
    onSuccess: async () => {
      await userSession.fetch()
      await queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const userSession = useUserSession()

  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: authRepository.logout,
    onSuccess: async () => {
      await userSession.clear()
      queryClient.removeQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })
}
