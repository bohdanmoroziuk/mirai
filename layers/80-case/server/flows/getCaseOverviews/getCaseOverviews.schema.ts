import { z } from 'zod'
import { userIdSchema } from '@common/server/schemas/user.schema'

export const getCaseOverviewsInputSchema = z.object({
  userId: userIdSchema,
})
