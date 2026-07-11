import type { Nullable } from '@core/shared/types/common'
import type { Collection } from '../../shared/types/collection'
import type { CreateCollectionInput } from '../types/create-collection.types'
import type { GetCollectionsInput } from '../types/get-collections.types'
import type { GetCollectionInput } from '../types/get-collection.types'
import type { UpdateCollectionInput } from '../types/update-collection.types'
import type { DeleteCollectionInput } from '../types/delete-collection.types'

export interface CollectionRepository {
  createOne(input: CreateCollectionInput): Promise<Collection>
  findMany(input: GetCollectionsInput): Promise<Collection[]>
  findOne(input: GetCollectionInput): Promise<Nullable<Collection>>
  updateOne(input: UpdateCollectionInput): Promise<Nullable<Collection>>
  deleteOne(input: DeleteCollectionInput): Promise<Nullable<Collection>>
}
