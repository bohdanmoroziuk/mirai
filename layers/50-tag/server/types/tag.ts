import type { z } from 'zod'
import type { Types, HydratedDocument, QueryFilter, UpdateQuery, QueryOptions } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { SuccessOutput } from '@core/shared/types/api'
import type { QuerySort } from '@common/server/types/mongoose'
import type {
  createTagBodySchema,
  deleteTagParamsSchema,
  updateTagBodySchema,
  updateTagParamsSchema,
} from '../schemas/tag.schema'

export type TagSchema = {
  userId: Types.ObjectId
  name: string
  color: Nullish<string>
  updatedAt: Date
  createdAt: Date
}

export type TagDocument = HydratedDocument<TagSchema>

export type CreateTagBody = z.infer<typeof createTagBodySchema>

export type CreateTagInput = {
  userId: string
  name: string
  color?: Nullish<string>
}

export type CreateTagDocumentInput = {
  userId: Types.ObjectId
  name: string
  color?: Nullish<string>
}

export type GetTagsInput = {
  userId: string
}

export type FindTagDocumentsQuery = {
  filter: QueryFilter<TagSchema>
  sort: QuerySort<TagSchema>
}

export type DeleteTagParams = z.infer<typeof deleteTagParamsSchema>

export type DeleteTagInput = {
  tagId: string
  userId: string
}

export type DeleteTagOutput = SuccessOutput

export type DeleteTagDocumentQuery = {
  filter: QueryFilter<TagSchema>
}

export type UpdateTagParams = z.infer<typeof updateTagParamsSchema>

export type UpdateTagBody = z.infer<typeof updateTagBodySchema>

export type UpdateTagInput = {
  userId: string
  tagId: string
  name?: Nullish<string>
  color?: Nullish<string>
}

export type UpdateTagDocumentQuery = {
  filter: QueryFilter<TagSchema>
  update: UpdateQuery<TagSchema>
  options: QueryOptions<TagSchema>
}
