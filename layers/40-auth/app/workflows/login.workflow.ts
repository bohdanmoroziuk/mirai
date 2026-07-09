import { useLoginMutation } from '../queries/auth.mutations'
import { toLoginInput } from '../mappers/auth-input.mapper'
import type { LoginFormState } from '../types/auth'

export const useLoginWorkflow = () => {
  const { error, isPending, mutateAsync } = useLoginMutation()

  const errorMessage = computed(() => {
    return toValue(error)
      ? getErrorMessage(toValue(error))
      : null
  })

  const login = async (state: LoginFormState) => {
    try {
      await mutateAsync(toLoginInput(state))
      await navigateTo('/')
      return true
    }
    catch {
      return false
    }
  }

  return {
    errorMessage,
    isPending,
    login,
  }
}
