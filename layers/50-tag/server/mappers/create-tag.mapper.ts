import type { CreateTagBody, CreateTagInput } from '../types/create-tag.types'

export const toCreateTagInput = (
  userId: string,
  body: CreateTagBody,
): CreateTagInput => {
  return {
    userId,
    name: body.name,
    color: body.color,
  }
}
