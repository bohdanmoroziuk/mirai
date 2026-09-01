import { mapValueOr } from '@core/shared/utils/value'
import type { Case } from '../../../../shared/types/case'
import type { CaseDocument } from '../types/case.mongo.types'

export const toCase = (document: CaseDocument): Case => ({
  id: document._id.toString(),
  title: document.title,
  description: mapValueOr(document.description, value => value, undefined),
  userId: document.userId.toString(),
  createdAt: document.createdAt.toISOString(),
  updatedAt: document.updatedAt.toISOString(),
})
