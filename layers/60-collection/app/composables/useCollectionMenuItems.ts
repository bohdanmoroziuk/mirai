import type { NavigationMenuItem } from '@nuxt/ui'
import { useCollectionsQuery } from '../queries/collection.queries'

export const useCollectionMenuItems = () => {
  const { collections } = useCollectionsQuery()

  const collectionMenuItems = computed<NavigationMenuItem[]>(() => {
    return collections.value.map((collection) => {
      return {
        label: collection.title,
        to: {
          path: '/bookmarks',
          query: {
            collectionId: collection.id,
          },
        },
        exact: true,
        exactQuery: true,
      }
    })
  })

  return {
    collectionMenuItems,
  }
}
