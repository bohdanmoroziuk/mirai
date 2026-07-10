import { toSelectItem } from '../mappers/collection.mapper'
import { useCollectionsQuery } from '../queries/collection.queries'

export const useCollectionSelectItems = () => {
  const { data, isPending } = useCollectionsQuery()
  const items = useMappedItems(data, toSelectItem)

  return {
    items,
    isPending,
  }
}
