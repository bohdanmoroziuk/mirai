import type { HydratedDocument, Types } from 'mongoose'

export type CaseFields = {
  title: string
  description?: string
  userId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export type CaseDocument = HydratedDocument<CaseFields>
