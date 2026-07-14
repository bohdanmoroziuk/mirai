import type { z } from 'zod'
import type { tagFormStateSchema } from '../schemas/tag.schema'

export type TagFormState = z.infer<typeof tagFormStateSchema>

export type TagPayload = TagFormState

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
