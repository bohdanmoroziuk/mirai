import type { CreateCaseInput } from '../../../../flows/createCase'
import type { CreateCaseData } from './createCase.types'

export const toCreateCaseData = (input: CreateCaseInput): CreateCaseData => ({
  title: input.title,
  description: input.description,
  userId: toObjectId(input.userId),
})
