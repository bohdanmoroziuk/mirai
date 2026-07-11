import type { CollectionFields } from './collection.mongo.types'

export type CreateCollectionData = Pick<
  CollectionFields,
  | 'title'
  | 'userId'
  | 'parentId'
>
