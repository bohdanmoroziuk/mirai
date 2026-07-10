import { useLoginMutation } from '../queries/auth.mutations'
import { toLoginInput } from '../mappers/auth-input.mapper'
import type { LoginFormState } from '../types/auth'

export const useLoginWorkflow = () => {
  const { error, isPending: isLoggingIn, mutateAsync } = useLoginMutation()

  const errorMessage = useMappedValueOr(error, getErrorMessage, null)

  const login = async (state: LoginFormState) => {
    if (toValue(isLoggingIn)) {
      return false
    }

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
    isLoggingIn,
    login,
  }
}
