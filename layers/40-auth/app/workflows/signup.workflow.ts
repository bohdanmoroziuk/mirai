import { useSignupMutation } from '../queries/auth.mutations'
import type { SignupInput } from '../types/auth'

export const useSignupWorkflow = () => {
  const { error, isPending: isSigningUp, mutateAsync } = useSignupMutation()

  const signup = async (input: SignupInput) => {
    if (toValue(isSigningUp)) {
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
    isSigningUp,
    signup,
  }
}
