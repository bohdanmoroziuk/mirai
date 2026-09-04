<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui'

const props = defineProps<{
  status: StepStatus
}>()

const statusColors = {
  [stepStatuses.Pending]: 'neutral',
  [stepStatuses.Active]: 'info',
  [stepStatuses.Completed]: 'success',
  [stepStatuses.Skipped]: 'neutral',
} satisfies Record<StepStatus, BadgeProps['color']>

const statusColor = computed(() => {
  return statusColors[props.status]
})
</script>

<template>
  <UBadge
    :color="statusColor"
    size="lg"
    class="rounded-full capitalize"
    variant="soft"
  >
    {{ status }}
  </UBadge>
</template>
