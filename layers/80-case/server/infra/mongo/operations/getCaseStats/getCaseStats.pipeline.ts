import type { PipelineStage, Types } from 'mongoose'
import { createMatchCaseOwnerStage } from '../../stages/matchCaseOwner.stage'
import { createLookupCaseStepsStage } from './stages/lookupCaseSteps.stage'
import { addCaseStepCountsStage } from './stages/addCaseStepCounts.stage'
import { groupCaseStatsStage } from './stages/groupCaseStats.stage'
import { projectCaseStatsStage } from './stages/projectCaseStats.stage'

export const createCaseStatsPipeline = (
  userId: Types.ObjectId,
): PipelineStage[] => [
  createMatchCaseOwnerStage(userId),
  createLookupCaseStepsStage(userId),
  addCaseStepCountsStage,
  groupCaseStatsStage,
  projectCaseStatsStage,
]
