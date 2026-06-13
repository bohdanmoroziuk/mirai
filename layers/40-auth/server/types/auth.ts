import type { z } from 'zod'
import type { signupBodySchema } from '@auth/server/schemas/auth.schema'

export type SignupUserInput = z.output<typeof signupBodySchema>
