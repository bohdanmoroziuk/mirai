import type { z } from 'zod'
import type { signupUserBodySchema } from '../schemas/signup-user.schema'

export type SignupUserBody = z.output<typeof signupUserBodySchema>

export type SignupUserInput = {
  name: string
  email: string
  password: string
}
