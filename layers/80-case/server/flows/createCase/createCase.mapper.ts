import type { CreateCaseBody, CreateCaseInput } from './createCase.types'

export const toCreateCaseInput = (
  userId: string,
  body: CreateCaseBody,
): CreateCaseInput => {
  return {
    title: body.title,
    description: body.description,
    userId,
  }
}
