import type { CaseRepository } from '../../ports/case.repository.port'

export const makeGetCaseOverviewsUseCase = (caseRepository: CaseRepository) => {
  return (input: GetCaseOverviewsInput): Promise<CaseOverview[]> => caseRepository.findOverviews(input)
}
