import type { RouteLocationRaw } from 'vue-router'

export type CaseStateItem = {
  id: string
  label: string
  to: RouteLocationRaw
}
