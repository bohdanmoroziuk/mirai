import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { getErrorMessage } from '@common/shared/utils/error'
import { authRepository } from '../repositories/auth.repository'

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
    return isError.value ? getErrorMessage(error.value) : null
  })

  return {
    errorMessage,
    loading,
    signup,
  }
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const userSession = useUserSession()

  const {
    error,
    isError,
    isPending: loading,
    mutateAsync: login,
  } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: authRepository.login,
    onSuccess: async () => {
      await userSession.fetch()
      await queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      })
    },
  })

  const errorMessage = computed(() => {
    return isError.value ? getErrorMessage(error.value) : null
  })

  return {
    errorMessage,
    loading,
    login,
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
