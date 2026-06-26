import type { CreateTagInput, DeleteTagInput, TagFormState } from '../types/tag'

export const toCreateTagInput = (state: TagFormState): CreateTagInput => {
  return {
    body: state,
  }
}

export const toDeleteTagInput = (tagId: string): DeleteTagInput => {
  return {
    params: {
      tagId,
    },
  }
}
