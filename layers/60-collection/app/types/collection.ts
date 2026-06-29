export type CollectionPayload = Pick<
  CollectionEntity,
  | 'title'
>

export type CollectionFormState = CollectionPayload

export type CreateCollectionInput = {
  body: CollectionPayload
}
