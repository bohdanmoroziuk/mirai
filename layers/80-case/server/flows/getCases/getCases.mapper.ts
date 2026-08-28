import type { GetCasesInput } from './getCases.types'

export const toGetCasesInput = (userId: string): GetCasesInput => ({ userId })
