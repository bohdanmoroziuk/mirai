import { mapValueOr } from '@core/shared/utils/value'
import type { CreateCollectionInput } from '../../../types/create-collection.types'
import type { CreateCollectionData } from '../types/create-collection.mongo.types'

export const toCreateCollectionData = (input: CreateCollectionInput): CreateCollectionData => {
  return {
    title: input.title,
    userId: toObjectId(input.userId),
    parentId: mapValueOr(input.parentId, toObjectId, null),
  }
}
