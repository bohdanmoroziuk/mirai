import { useSignupMutation } from '../queries/auth.mutations'
import { toSignupInput } from '../mappers/auth-input.mapper'
import type { SignupFormState } from '../types/auth'

export const useSignupWorkflow = () => {
  const { error, isPending: isSigningUp, mutateAsync } = useSignupMutation()

  const errorMessage = useMappedValueOr(error, getErrorMessage, null)

  const signup = async (state: SignupFormState) => {
    if (toValue(isSigningUp)) {
      return false
    }

    try {
      await mutateAsync(toSignupInput(state))
      await navigateTo('/')
      return true
    }
    catch {
      return false
    }
  }

  return {
    errorMessage,
    isSigningUp,
    signup,
  }
}
