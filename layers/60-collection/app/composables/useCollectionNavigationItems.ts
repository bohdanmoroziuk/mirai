import { toNavigationItem } from '../mappers/collection.mapper'
import { useCollectionsQuery } from '../queries/collection.queries'

export const useCollectionNavigationItems = () => {
  const { data, isPending } = useCollectionsQuery()
  const items = useMappedItems(data, toNavigationItem)

  return {
    items,
    isPending,
  }
}
