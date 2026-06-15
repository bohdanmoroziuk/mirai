import type { User } from '@user/shared/types/user'

export type AuthUser = Pick<
  User,
  | 'id'
  | 'email'
  | 'name'
  | 'avatarUrl'
>

export type SessionUser = AuthUser

export const PageAccess = {
  Public: 'public',
  Private: 'private',
  GuestOnly: 'guest-only',
} as const

export type PageAccess = typeof PageAccess[keyof typeof PageAccess]
