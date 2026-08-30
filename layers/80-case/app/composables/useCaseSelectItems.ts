import { toSelectItem } from '../mappers/case.mapper'

export const useCaseSelectItems = () => {
  const { data, error, isPending } = useGetCasesWorkflow()
  const items = useMappedItems(data, toSelectItem)

  return {
    items,
    error,
    isPending,
  }
}
