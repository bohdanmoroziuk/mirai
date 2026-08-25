import type { PipelineStage, Types } from 'mongoose'
import { createLookupStepsStage } from '../shared/stages/lookup-steps.stage'
import { addCaseStepCountsStage } from './stages/add-case-step-counts.stage'
import { groupCaseStatsStage } from './stages/group-case-stats.stage'

export const createCaseStatsPipeline = (
  userId: Types.ObjectId,
): PipelineStage[] => [
  // Match cases owned by the current user.
  {
    $match: {
      userId,
    },
  },

  // Load steps related to each case.
  createLookupStepsStage(userId),

  // Calculate total and remaining step counts.
  addCaseStepCountsStage,

  // Aggregate cases into total, active, completed, and empty stats.
  groupCaseStatsStage,

  // Shape the final CaseStats result.
  {
    $project: {
      _id: 0,
      total: 1,
      active: 1,
      completed: 1,
      empty: 1,
    },
  },
]
