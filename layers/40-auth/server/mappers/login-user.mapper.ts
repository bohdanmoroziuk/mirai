import type { LoginUserBody, LoginUserInput } from '../types/login-user.types'

export const toLoginUserInput = (body: LoginUserBody): LoginUserInput => {
  return {
    email: body.email,
    password: body.password,
  }
}
