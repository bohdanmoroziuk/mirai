import type { HydratedDocument, Types } from 'mongoose'

export type TagFields = {
  userId: Types.ObjectId
  name: string
  color: string
  updatedAt: Date
  createdAt: Date
}

export type TagDocument = HydratedDocument<TagFields>
