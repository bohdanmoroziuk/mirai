import type { User } from '../../shared/types/user'

export type UserWithPassword = User & {
  passwordHash: string
}
