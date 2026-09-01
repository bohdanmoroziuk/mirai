import type { PipelineStage } from 'mongoose'

export const projectCaseStatsStage: PipelineStage.Project = {
  $project: {
    _id: 0,
    total: 1,
    active: 1,
    completed: 1,
    empty: 1,
  },
}
