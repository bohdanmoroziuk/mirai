import type { User } from '@user/shared/types/user'

export type AuthUser = Pick<
  User,
  | 'id'
  | 'email'
  | 'name'
  | 'avatarUrl'
>
