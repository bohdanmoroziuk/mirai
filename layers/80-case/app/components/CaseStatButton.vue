<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  label?: string
  to: RouteLocationRaw
}>()
</script>

<template>
  <UButton
    :to
    color="neutral"
    active-color="primary"
    variant="outline"
    exact-query
  >
    <slot>
      {{ label }}
    </slot>
  </UButton>
</template>
