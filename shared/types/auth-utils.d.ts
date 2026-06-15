/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { SessionUser } from '@auth/shared/types/auth'

declare module '#auth-utils' {
  interface User extends SessionUser {}
}

export {}
