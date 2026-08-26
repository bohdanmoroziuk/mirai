import type { PipelineStage, Types } from 'mongoose'

/**
 * Creates a pipeline stage that keeps only cases owned by the given user.
 *
 * @param userId - The MongoDB identifier of the case owner.
 * @returns A MongoDB match stage for the user's cases.
 */
export const createMatchCaseOwnerStage = (
  userId: Types.ObjectId,
): PipelineStage.Match => ({
  $match: {
    userId,
  },
})
