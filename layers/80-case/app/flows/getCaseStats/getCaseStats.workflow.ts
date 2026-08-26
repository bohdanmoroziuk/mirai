export const useGetCaseStatsWorkflow = () => {
  const { data, error, isPending } = useCaseStatsQuery()

  return {
    data,
    error,
    isPending,
  }
}
