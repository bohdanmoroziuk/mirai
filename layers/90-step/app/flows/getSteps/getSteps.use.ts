export const useStepList = (caseId: MaybeRefOrGetter<string>) => {
  const stepsQueryInput = computed(() => {
    return toGetStepsInput(toValue(caseId))
  })

  const {
    data,
    error,
    isPending,
  } = useStepsQuery(stepsQueryInput)

  return {
    data,
    error,
    isPending,
  }
}
