import type { CaseFormState } from '../../types/case'

export const toUpdateCaseInput = (
  caseId: string,
  state: CaseFormState,
): UpdateCaseInput => {
  return {
    params: {
      caseId,
    },
    body: {
      title: state.title,
      description: state.description,
    },
  }
}
