import type { PipelineStage, Types } from 'mongoose'

export const createLookupStepsStage = (
  userId: Types.ObjectId,
): PipelineStage.Lookup => ({
  $lookup: {
    from: 'steps',

    let: {
      caseId: '$_id',
    },

    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ['$caseId', '$$caseId'],
              },
              {
                $eq: ['$userId', userId],
              },
            ],
          },
        },
      },
    ],

    as: 'steps',
  },
})
