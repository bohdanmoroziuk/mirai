import type { PipelineStage } from 'mongoose'

export const groupCaseStatsStage: PipelineStage.Group = {
  $group: {
    _id: null,

    total: {
      $sum: 1,
    },

    empty: {
      $sum: {
        $cond: [
          {
            $eq: ['$stepCount', 0],
          },
          1,
          0,
        ],
      },
    },

    active: {
      $sum: {
        $cond: [
          {
            $gt: ['$remainingStepCount', 0],
          },
          1,
          0,
        ],
      },
    },

    completed: {
      $sum: {
        $cond: [
          {
            $and: [
              {
                $gt: ['$stepCount', 0],
              },
              {
                $eq: ['$remainingStepCount', 0],
              },
            ],
          },
          1,
          0,
        ],
      },
    },
  },
}
