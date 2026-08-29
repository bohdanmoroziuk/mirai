import { toSelectItem } from '../mappers/case.mapper'

export const useCaseSelectItems = () => {
  const { data, isPending } = useCasesQuery()
  const items = useMappedItems(data, toSelectItem)

  return {
    items,
    isPending,
  }
}
