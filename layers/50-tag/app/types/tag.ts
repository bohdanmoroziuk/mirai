import type { z } from 'zod'
import type { tagFormStateSchema } from '../schemas/tag.schema'

export type TagFormState = z.infer<typeof tagFormStateSchema>

export type TagQuery = {
  search?: string
}

export type GetTagsInput = {
  query?: TagQuery
}

export type TagPayload = TagFormState

export type CreateTagInput = {
  body: TagPayload
}

export type TagParams = {
  tagId: string
}

export type DeleteTagInput = {
  params: TagParams
}

export type DeleteTagOutput = SuccessOutput
