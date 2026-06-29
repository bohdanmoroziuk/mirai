<script setup lang="ts">
defineProps<{
  tags: Tag[]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-1">
    <TagBadge
      v-for="tag of tags"
      :key="tag.id"
      :color="tag.color"
    >
      {{ tag.name }}
    </TagBadge>
  </div>
</template>
