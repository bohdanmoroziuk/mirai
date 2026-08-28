import { z } from 'zod'
import { userIdSchema } from '@common/server/schemas/user.schema'

export const getCasesInputSchema = z.object({
  userId: userIdSchema,
})
