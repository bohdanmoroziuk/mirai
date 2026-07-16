import { useLoginMutation } from '../queries/auth.mutations'
import type { LoginInput } from '../types/auth'

export const useLoginWorkflow = () => {
  const { error, isPending: isLoggingIn, mutateAsync } = useLoginMutation()

  const login = async (input: LoginInput) => {
    if (toValue(isLoggingIn)) {
      return false
    }

    try {
      await mutateAsync(input)
      await navigateTo('/')
      return true
    }
    catch {
      return false
    }
  }

  return {
    error,
    isLoggingIn,
    login,
  }
}
