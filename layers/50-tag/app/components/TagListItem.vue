<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'

defineProps<{
  tag: Tag
  number: number
}>()
</script>

<template>
  <li class="flex items-center gap-8 px-4 py-2 shadow-xs hover:shadow-sm">
    <div>
      #{{ number }}
    </div>

    <div class="flex-1">
      <TagBadge :color="tag.color">
        {{ tag.name }}
      </TagBadge>
    </div>

    <div class="text-muted text-sm">
      Created {{ formatTimeAgo(new Date(tag.createdAt)) }}
    </div>

    <div class="flex gap-2">
      <UButton
        icon="i-lucide-edit"
        size="sm"
        color="info"
        variant="ghost"
      />

      <UButton
        icon="i-lucide-trash-2"
        size="sm"
        color="error"
        variant="ghost"
      />
    </div>
  </li>
</template>
