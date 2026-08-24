import type { CaseFields } from './case.mongo.types'

export type CreateCaseData = Pick<CaseFields, 'title' | 'description' | 'userId'>
