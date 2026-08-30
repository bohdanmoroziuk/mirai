import type { Case } from '../../../shared/types/case'
import type { CaseRepository } from '../../ports/case.repository.port'
import type { CreateCaseInput } from './createCase.types'

export const makeCreateCaseUseCase = (caseRepository: CaseRepository) => {
  return (input: CreateCaseInput): Promise<Case> => caseRepository.createOne(input)
}
