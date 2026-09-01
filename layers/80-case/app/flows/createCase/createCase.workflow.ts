export const useCreateCaseWorkflow = () => {
  const notification = useNotification()
  const { isPending: isCreating, mutateAsync } = useCreateCaseMutation()

  const createCase = async (input: CreateCaseInput) => {
    if (toValue(isCreating)) {
      return false
    }

    try {
      await mutateAsync(input)

      notification.success({
        title: 'Case created',
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
    isCreating,
    createCase,
  }
}
