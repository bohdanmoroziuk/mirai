<script setup lang="ts">
defineProps<{
  stats: CaseStats
}>()
</script>

<template>
  <div class="flex items-center justify-start gap-4">
    <UButton
      color="neutral"
      active-color="primary"
      variant="outline"
      exact-query
      :to="{ path: '/cases', query: { status: 'active' } }"
    >
      Active · {{ stats.active }}
    </UButton>

    <UButton
      color="neutral"
      active-color="primary"
      variant="outline"
      exact-query
      :to="{ path: '/cases', query: { status: 'completed' } }"
    >
      Completed · {{ stats.completed }}
    </UButton>

    <UButton
      color="neutral"
      active-color="primary"
      variant="outline"
      exact-query
      :to="{ path: '/cases', query: { status: 'empty' } }"
    >
      Empty · {{ stats.empty }}
    </UButton>

    <UButton
      color="neutral"
      active-color="primary"
      variant="outline"
      exact-query
      :to="{ path: '/cases' }"
    >
      All · {{ stats.total }}
    </UButton>
  </div>
</template>
