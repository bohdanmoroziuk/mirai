import type { PageAccess } from '@auth/shared/types/auth'

declare module '#app' {
  interface PageMeta {
    access?: PageAccess
    devOnly?: boolean
    pageTitle?: string
  }
}

export {}
