import type { CreateCaseBody, CreateCaseInput } from '../types/create-case.types'

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
