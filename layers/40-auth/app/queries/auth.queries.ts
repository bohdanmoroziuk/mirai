import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { getErrorMessage } from '@core/shared/utils/error'
import { authRepository } from '@auth/app/repositories/auth.repository'

export const useSignupMutation = () => {
  const queryClient = useQueryClient()
  const userSession = useUserSession()

  const {
    error,
    isError,
    isPending: loading,
    mutateAsync: signup,
  } = useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: authRepository.signup,
    onSuccess: async () => {
      await userSession.fetch()
      await queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })

  const errorMessage = computed(() => {
    return isError.value ? getErrorMessage(error) : null
  })

  return {
    errorMessage,
    loading,
    signup,
  }
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const userSession = useUserSession()

  const {
    isPending: loading,
    mutateAsync: logout,
  } = useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: authRepository.logout,
    onSuccess: async () => {
      await userSession.clear()
      queryClient.removeQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })

  return {
    loading,
    logout,
  }
}
