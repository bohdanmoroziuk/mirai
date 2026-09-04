<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  stepId: string
}>()

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    [
      {
        label: 'Update',
        icon: 'i-lucide-pencil',
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
      icon="i-charm-menu-kebab"
      color="neutral"
      variant="link"
    />
  </UDropdownMenu>
</template>
