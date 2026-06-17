import type { Types, HydratedDocument } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { Timestamps } from '@core/shared/types/entity'

export type TagRecord = {
  userId: Types.ObjectId
  name: string
  color: Nullish<string>
}

export type TagSchema = TagRecord & Timestamps

export type TagDocument = HydratedDocument<TagSchema>

export type CreateOneTagInput = {
  userId: Types.ObjectId
  name: string
  color?: Nullish<string>
}

export type CreateTagInput = {
  userId: string
  name: string
  color?: Nullish<string>
}
