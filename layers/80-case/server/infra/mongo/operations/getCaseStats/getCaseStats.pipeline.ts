import type { PipelineStage, Types } from 'mongoose'

export const createCaseStatsPipeline = (
  userId: Types.ObjectId,
): PipelineStage[] => [
  createMatchCaseOwnerStage(userId),
  createLookupCaseStepsStage(userId),
  addCaseStepCountsStage,
  groupCaseStatsStage,
  projectCaseStatsStage,
]
