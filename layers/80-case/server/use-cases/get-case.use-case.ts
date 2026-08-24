import type { Case } from '../../shared/types/case'
import type { CaseRepository } from '../ports/case.repository.port'
import type { GetCaseInput } from '../types/get-case.types'

export const makeGetCaseUseCase = (caseRepository: CaseRepository) => {
  return async (input: GetCaseInput): Promise<Case> => {
    const caseItem = await caseRepository.findOne(input)
    ensureResourceFound(caseItem, 'Case not found')
    return caseItem
  }
}
