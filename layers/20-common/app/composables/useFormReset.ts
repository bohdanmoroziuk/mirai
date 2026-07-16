export type FormResetHandle = {
  resetState: () => void
}

export const useFormReset = (refKey: string) => {
  const formRef = useTemplateRef<FormResetHandle>(refKey)

  const resetForm = () => {
    if (formRef.value) {
      formRef.value.resetState()
      return
    }

    throw new Error(`Form ref "${refKey}" is not mounted.`)
  }

  return {
    resetForm,
  }
}
