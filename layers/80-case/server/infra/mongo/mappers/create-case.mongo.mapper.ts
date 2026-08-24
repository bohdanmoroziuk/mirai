import type { CreateCaseInput } from '../../../types/create-case.types'
import type { CreateCaseData } from '../types/create-case.mongo.types'

export const toCreateCaseData = (input: CreateCaseInput): CreateCaseData => ({
  title: input.title,
  description: input.description,
  userId: toObjectId(input.userId),
})
