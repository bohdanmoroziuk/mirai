import type { CaseRepository } from '../ports/case.repository.port'
import type { DeleteCaseInput, DeleteCaseOutput } from '../types/delete-case.types'

export const makeDeleteCaseUseCase = (caseRepository: CaseRepository) => {
  return async (input: DeleteCaseInput): Promise<DeleteCaseOutput> => {
    const caseItem = await caseRepository.deleteOne(input)
    ensureResourceFound(caseItem, 'Case not found')
    return { success: true }
  }
}
