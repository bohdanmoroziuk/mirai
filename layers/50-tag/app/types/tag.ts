export type TagPayload = Pick<
  TagEntity,
  | 'name'
  | 'color'
>

export type TagFormState = TagPayload

export type GetTagsQuery = {
  search?: string
}

export type GetTagsInput = {
  query?: GetTagsQuery
}

export type CreateTagInput = {
  body: TagPayload
}

export type DeleteTagInput = {
  params: {
    tagId: string
  }
}

export type DeleteTagOutput = SuccessOutput
