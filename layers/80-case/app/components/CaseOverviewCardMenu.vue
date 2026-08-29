<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const props = defineProps<{
  caseId: string
}>()

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    [
      {
        label: 'Open',
        icon: 'i-lucide-external-link',
        to: {
          name: 'cases-caseId',
          params: {
            caseId: props.caseId,
          },
        },
      },
    ],
    [
      {
        label: 'Delete',
        color: 'error',
        icon: 'i-lucide-trash',
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
