<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const props = defineProps<{
  caseId: string
}>()

const { openCase, updateCase, deleteCase } = useCaseOverviewsContext()

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    [
      {
        label: 'Open',
        icon: 'i-lucide-external-link',
        onSelect: () => {
          openCase(props.caseId)
        },
      },
      {
        label: 'Update',
        icon: 'i-lucide-pencil',
        onSelect: () => {
          updateCase(props.caseId)
        },
      },
    ],
    [
      {
        label: 'Delete',
        color: 'error',
        icon: 'i-lucide-trash',
        onSelect: () => {
          deleteCase(props.caseId)
        },
      },
    ],
  ]
})
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8,
    }"
    :ui="{
      content: 'w-48',
    }"
  >
    <UButton
      icon="i-lucide-menu"
      color="neutral"
      variant="link"
    />
  </UDropdownMenu>
</template>
