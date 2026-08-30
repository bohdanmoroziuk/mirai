import type { Case } from '../../../shared/types/case'
import type { CaseRepository } from '../../ports/case.repository.port'
import type { UpdateCaseInput } from './updateCase.types'

export const makeUpdateCaseUseCase = (caseRepository: CaseRepository) => {
  return async (input: UpdateCaseInput): Promise<Case> => {
    const caseItem = await caseRepository.updateOne(input)
    ensureResourceFound(caseItem, 'Case not found')
    return caseItem
  }
}
