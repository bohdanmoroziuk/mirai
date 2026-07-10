import { getErrorMessage } from '@common/shared/utils/error'
import { useLogoutMutation } from '../queries/auth.mutations'

export const useLogoutWorkflow = () => {
  const notification = useNotification()
  const { isPending: isLoggingOut, mutateAsync } = useLogoutMutation()

  const logout = async () => {
    if (toValue(isLoggingOut)) {
      return false
    }

    try {
      await mutateAsync()
      await navigateTo('/auth/login')
      return true
    }
    catch (error) {
      notification.error({
        title: 'Logout failed',
        description: getErrorMessage(error),
      })
      return false
    }
  }

  return {
    isLoggingOut,
    logout,
  }
}
