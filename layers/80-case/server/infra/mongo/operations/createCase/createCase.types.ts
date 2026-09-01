import type { CaseFields } from '../../types/case.mongo.types'

export type CreateCaseData = Pick<CaseFields, 'title' | 'description' | 'userId'>
