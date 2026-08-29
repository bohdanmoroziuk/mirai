import type { SelectMenuItem } from '@nuxt/ui'

export const toSelectItem = (caseItem: Case): SelectMenuItem => {
  return {
    label: caseItem.title,
    value: caseItem.id,
  }
}
