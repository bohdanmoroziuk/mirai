import type { SelectMenuItem, NavigationMenuItem } from '@nuxt/ui'
import type { CollectionFormState } from '../types/collection'

export const getCollectionFormInitialState = (): CollectionFormState => ({
  title: '',
})

export const toNavigationItem = (collection: Collection): NavigationMenuItem => {
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
}

export const toSelectItem = (collection: Collection): SelectMenuItem => {
  return {
    label: collection.title,
    value: collection.id,
  }
}
