export const useDeleteCaseWorkflow = () => {
  const notification = useNotification()
  const { isPending: isDeleting, mutateAsync } = useDeleteCaseMutation()

  const deleteCase = async (caseId: string) => {
    if (toValue(isDeleting)) {
      return
    }

    try {
      await mutateAsync(toDeleteCaseInput(caseId))

      notification.success({
        title: 'Case deleted',
      })
    }
    catch (error) {
      notification.error({
        title: 'Operation failed',
        description: getErrorMessage(error),
      })
    }
  }

  return {
    isDeleting,
    deleteCase,
  }
}
