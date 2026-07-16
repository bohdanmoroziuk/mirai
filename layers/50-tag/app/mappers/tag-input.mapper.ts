import type { CreateTagInput, DeleteTagInput, GetTagsInput, TagsQuery, TagFormState } from '../types/tag'

export const toGetTagsInput = (query: TagsQuery): GetTagsInput => {
  return {
    query: compactObject({
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
