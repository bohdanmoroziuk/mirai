export const useGetCaseWorkflow = (
  input: MaybeRefOrGetter<GetCaseInput>,
) => {
  const {
    data,
    error,
    isPending,
    isFetching,
    refetch,
  } = useCaseQuery(input)

  return {
    data,
    error,
    isPending,
    isFetching,
    refetch,
  }
}
