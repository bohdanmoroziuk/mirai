export const useUpdateCaseWorkflow = () => {
  const notification = useNotification()
  const { isPending: isUpdating, mutateAsync } = useUpdateCaseMutation()

  const updateCase = async (input: UpdateCaseInput) => {
    if (toValue(isUpdating)) {
      return false
    }

    try {
      await mutateAsync(input)

      notification.success({
        title: 'Case updated',
      })

      return true
    }
    catch (error) {
      notification.error({
        title: 'Operation failed',
        description: getErrorMessage(error),
      })

      return false
    }
  }

  return {
    isUpdating,
    updateCase,
  }
}
