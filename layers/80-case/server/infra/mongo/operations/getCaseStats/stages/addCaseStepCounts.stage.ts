import type { PipelineStage } from 'mongoose'

export const addCaseStepCountsStage: PipelineStage.Set = {
  $set: {
    stepCount: {
      $size: '$steps',
    },

    remainingStepCount: {
      $size: {
        $filter: {
          input: '$steps',
          as: 'step',

          cond: {
            $not: {
              $in: [
                '$$step.status',
                ['completed', 'skipped'],
              ],
            },
          },
        },
      },
    },
  },
}
