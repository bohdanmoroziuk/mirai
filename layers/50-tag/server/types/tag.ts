import type { z } from 'zod'
import type { Types, HydratedDocument, QueryFilter } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { QuerySort } from '@shared/server/types/mongoose'
import type { createTagBodySchema } from '@tag/server/schemas/tag.schema'

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

export type FindManyTagDocumentsQuery = {
  filter: QueryFilter<TagSchema>
  sort: QuerySort<TagSchema>
}
