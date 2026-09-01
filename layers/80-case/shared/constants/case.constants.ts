import type { CaseStats } from '../types/case'

export const EMPTY_CASE_STATS = {
  total: 0,
  active: 0,
  completed: 0,
  empty: 0,
} as const satisfies CaseStats
