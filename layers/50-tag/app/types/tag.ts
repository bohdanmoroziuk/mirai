export type TagPayload = Pick<
  TagEntity,
  | 'name'
  | 'color'
>

export type TagFormState = TagPayload

export type GetTagsInput = {
  query?: {
    search?: string
  }
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
