import type { Case } from '../../../shared/types/case'
import type { CaseRepository } from '../../ports/case.repository.port'

export const makeGetCasesUseCase = (caseRepository: CaseRepository) => {
  return (input: GetCasesInput): Promise<Case[]> => caseRepository.findMany(input)
}
