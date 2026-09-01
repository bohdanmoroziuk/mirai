export const useGetCasesWorkflow = () => {
  const { data, error, isPending } = useCasesQuery()

  return {
    data,
    error,
    isPending,
  }
}
