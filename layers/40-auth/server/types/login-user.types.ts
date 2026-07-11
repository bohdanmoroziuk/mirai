import type { z } from 'zod'
import type { loginUserBodySchema } from '../schemas/login-user.schema'

export type LoginUserBody = z.output<typeof loginUserBodySchema>

export type LoginUserInput = {
  email: string
  password: string
}
