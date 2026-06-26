export type GetTagsQuery = {
  search?: string
}

export type TagBody = Pick<
  TagEntity,
  | 'name'
  | 'color'
>

export type TagFormState = TagBody

export type CreateTagInput = TagBody

export type DeleteTagOutput = SuccessOutput
