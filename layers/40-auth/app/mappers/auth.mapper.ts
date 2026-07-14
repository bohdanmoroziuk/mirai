import type { LoginFormState, SignupFormState } from '../types/auth'

export const getLoginFormInitialState = (): LoginFormState => {
  return {
    email: '',
    password: '',
  }
}

export const getSignupFormInitialState = (): SignupFormState => {
  return {
    name: '',
    email: '',
    password: '',
  }
}
