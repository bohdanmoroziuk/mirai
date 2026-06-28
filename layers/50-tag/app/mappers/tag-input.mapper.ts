import type { CreateTagInput, DeleteTagInput, GetTagsInput, GetTagsQuery, TagFormState } from '../types/tag'

export const toGetTagsInput = (query: GetTagsQuery): GetTagsInput => {
  return {
    query: compactQuery({
      search: query.search?.trim() || undefined,
    }),
  }
}

export const toCreateTagInput = (state: TagFormState): CreateTagInput => {
  return {
    body: {
      name: state.name,
      color: state.color,
    },
  }
}

export const toDeleteTagInput = (tagId: string): DeleteTagInput => {
  return {
    params: {
      tagId,
    },
  }
}
