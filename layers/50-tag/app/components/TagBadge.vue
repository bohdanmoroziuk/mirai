<script setup lang="ts">
import { DEFAULT_TAG_COLOR } from '../../shared/constants/tag'

withDefaults(defineProps<{
  name?: string
  color?: string
}>(), {
  color: DEFAULT_TAG_COLOR,
})
</script>

<template>
  <span
    class="inline-flex items-center gap-x-1.5 py-0.5 px-1.5 rounded-full text-xs font-medium text-white"
    :style="{ backgroundColor: color }"
  >
    <slot>
      {{ name }}
    </slot>
  </span>
</template>
