import { mapValueOr } from '@core/shared/utils/value'
import type { Step } from '../../../../shared/types/step'
import type { StepDocument } from '../types/step.mongo.types'

export const toStep = (document: StepDocument): Step => ({
  id: document._id.toString(),
  userId: document.userId.toString(),
  caseId: document.caseId.toString(),
  title: document.title,
  description: document.description,
  status: document.status,
  order: document.order,
  completedAt: mapValueOr(
    document.completedAt,
    completedAt => completedAt.toISOString(),
    null,
  ),
  createdAt: document.createdAt.toISOString(),
  updatedAt: document.updatedAt.toISOString(),
})
