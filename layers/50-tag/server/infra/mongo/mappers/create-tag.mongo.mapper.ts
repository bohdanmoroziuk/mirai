import type { CreateTagInput } from '../../../types/create-tag.types'
import type { CreateTagData } from '../types/create-tag.mongo.types'

export const toCreateTagData = (input: CreateTagInput): CreateTagData => {
  return {
    userId: toObjectId(input.userId),
    name: input.name,
    color: input.color,
  }
}
