import type { SortOrder } from 'mongoose'

export type QuerySort<T> = Partial<
  Record<
    Extract<keyof T, string>,
    SortOrder
  >
>
