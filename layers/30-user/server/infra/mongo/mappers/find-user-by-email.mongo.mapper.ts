import type { GetUserByEmailInput } from '../../../types/get-user-by-email.types'
import type { FindUserByEmailQuery } from '../types/find-user-by-email.mongo.types'

export const toFindUserByEmailQuery = (input: GetUserByEmailInput): FindUserByEmailQuery => {
  return {
    filter: {
      email: input.email,
    },
  }
}
