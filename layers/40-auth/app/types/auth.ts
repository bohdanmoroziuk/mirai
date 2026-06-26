import type { z } from 'zod'
import type { SuccessOutput } from '@core/shared/types/api'
import type { signupPayloadSchema, loginPayloadSchema } from '../schemas/auth.schema'

export type SignupPayload = z.infer<typeof signupPayloadSchema>

export type LoginPayload = z.infer<typeof loginPayloadSchema>

export type SignupFormState = SignupPayload

export type LoginFormState = LoginPayload

export type SignupInput = {
  body: SignupPayload
}

export type LoginInput = {
  body: LoginPayload
}

export type LogoutOutput = SuccessOutput
