export const useGetCaseOverviewsWorkflow = () => {
  const { data, error, isPending } = useCaseOverviewsQuery()

  return {
    data,
    error,
    isPending,
  }
}
