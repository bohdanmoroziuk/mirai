import type { CollectionFormState, CreateCollectionInput } from '../types/collection'

export const toCreateCollectionInput = (state: CollectionFormState): CreateCollectionInput => {
  return {
    body: {
      title: state.title,
    },
  }
}
