export const getCaseFormInitialState = (): CaseFormState => {
  return {
    title: '',
    description: '',
  }
}

export const toCreateCaseInput = (state: CaseFormState): CreateCaseInput => {
  return {
    body: {
      title: state.title,
      description: state.description,
    },
  }
}
