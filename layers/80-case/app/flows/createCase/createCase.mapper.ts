import type { CaseFormState } from '../../types/case'

export const toCreateCaseInput = (state: CaseFormState): CreateCaseInput => {
  return {
    body: {
      title: state.title,
      description: state.description,
    },
  }
}
