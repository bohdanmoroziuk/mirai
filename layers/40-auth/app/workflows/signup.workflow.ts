import { useSignupMutation } from '../queries/auth.mutations'
import { toSignupInput } from '../mappers/auth-input.mapper'
import type { SignupFormState } from '../types/auth'

export const useSignupWorkflow = () => {
  const { error, isPending, mutateAsync } = useSignupMutation()

  const errorMessage = computed(() => {
    return toValue(error)
      ? getErrorMessage(toValue(error))
      : null
  })

  const signup = async (state: SignupFormState) => {
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
    isPending,
    signup,
  }
}
