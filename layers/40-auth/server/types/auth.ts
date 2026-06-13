import type { z } from 'zod'
import type { signupBodySchema, loginBodySchema } from '@auth/server/schemas/auth.schema'

export type SignupUserInput = z.output<typeof signupBodySchema>

export type LoginUserInput = z.output<typeof loginBodySchema>
