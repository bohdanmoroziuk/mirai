<script setup lang="ts">
const props = defineProps<{
  tagIds: string[]
}>()

const { selectedTags, hasSelectedTags } = useSelectedTags(() => props.tagIds)
</script>

<template>
  <TagBadgeList
    v-if="hasSelectedTags"
    :tags="selectedTags"
  />
</template>
