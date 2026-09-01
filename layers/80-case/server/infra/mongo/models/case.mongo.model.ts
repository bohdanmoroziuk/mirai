import { Schema } from 'mongoose'
import type { CaseFields } from '../types/case.mongo.types'

const caseSchema = new Schema<CaseFields>({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 120,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 2_000,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
}, {
  timestamps: true,
})

caseSchema.index({ userId: 1, createdAt: -1 })

export const CaseModel = createMongooseModel<CaseFields>('Case', caseSchema)
