import type { SelectMenuItem } from '@nuxt/ui'
import type { CaseFormState } from '../types/case'

export const getCaseFormInitialState = (): CaseFormState => {
  return {
    title: '',
    description: '',
  }
}

export const toCaseFormState = (caseItem: Case): CaseFormState => {
  return {
    title: caseItem.title,
    description: caseItem.description ?? '',
  }
}

export const toSelectItem = (caseItem: Case): SelectMenuItem => {
  return {
    label: caseItem.title,
    value: caseItem.id,
  }
}
