import { z } from 'zod'
import { userIdSchema } from '@common/server/schemas/user.schema'

export const getCaseStatsInputSchema = z.object({
  userId: userIdSchema,
})
