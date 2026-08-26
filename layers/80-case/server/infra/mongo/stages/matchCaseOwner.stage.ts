import type { PipelineStage, Types } from 'mongoose'

export const createMatchCaseOwnerStage = (
  userId: Types.ObjectId,
): PipelineStage.Match => ({
  $match: {
    userId,
  },
})
