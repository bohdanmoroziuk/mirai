export const useDeleteCaseWorkflow = () => {
  const notification = useNotification()
  const { confirm } = useConfirmModal()
  const { isPending: isDeleting, mutateAsync } = useDeleteCaseMutation()

  const deleteCase = async (caseId: string) => {
    if (toValue(isDeleting)) {
      return
    }

    try {
      const isConfirmed = await confirm({
        title: 'Delete case',
        description: 'Are you sure you want to delete this case?',
        confirmLabel: 'Delete',
      })

      if (isFalsy(isConfirmed)) return

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
