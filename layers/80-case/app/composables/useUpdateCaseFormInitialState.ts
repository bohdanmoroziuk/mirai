import { getCaseFormInitialState, toCaseFormState } from '../mappers/case.mapper'

export const useUpdateCaseFormInitialState = (
  caseId: MaybeRefOrGetter<string>,
) => {
  const caseQueryInput = computed(() => {
    return toGetCaseInput(toValue(caseId))
  })

  const {
    data: caseItem,
    isFetching: isRefreshing,
    error,
    refetch: refresh,
  } = useGetCaseWorkflow(caseQueryInput)

  const initialState = computed(() => {
    return isDefined(caseItem)
      ? toCaseFormState(toValue(caseItem))
      : getCaseFormInitialState()
  })

  return {
    initialState,
    isRefreshing,
    error,
    refresh,
  }
}
