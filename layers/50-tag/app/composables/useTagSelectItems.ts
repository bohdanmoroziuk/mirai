import { toSelectItem } from '../mappers/tag.mapper'
import { useTagsQuery } from '../queries/tag.queries'

export const useTagSelectItems = () => {
  const { data, isPending } = useTagsQuery()
  const items = useMappedItems(data, toSelectItem)

  return {
    items,
    isPending,
  }
}
