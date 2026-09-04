import { Schema } from 'mongoose'
import { stepStatuses } from '../../../../shared/types/step'
import type { StepFields } from '../types/step.mongo.types'

const stepSchema = new Schema<StepFields>({
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'Case',
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(stepStatuses),
    default: stepStatuses.Pending,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
})

stepSchema.index(
  {
    caseId: 1,
    order: 1,
  },
  {
    unique: true,
  },
)

export const StepModel = createMongooseModel<StepFields>('Step', stepSchema)
