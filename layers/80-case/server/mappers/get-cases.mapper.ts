import type { GetCasesInput } from '../types/get-cases.types'

export const toGetCasesInput = (userId: string): GetCasesInput => ({ userId })
