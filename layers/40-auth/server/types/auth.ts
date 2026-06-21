import type { z } from 'zod'
import type { signupBodySchema, loginBodySchema } from '../schemas/auth.schema'

export type SignupUserInput = z.output<typeof signupBodySchema>

export type LoginUserInput = z.output<typeof loginBodySchema>
