<script setup lang="ts">
import { useTagsQuery } from '../queries/tag.queries'

const props = defineProps<{
  tagIds: string[]
}>()

const { tags } = useTagsQuery()

const tagMap = computed(() => {
  return new Map(
    tags.value.map((tag) => {
      return [tag.id, tag]
    }),
  )
})

const selectedTags = computed(() => {
  return props.tagIds
    .map(tagId => tagMap.value.get(tagId))
    .filter((tag): tag is Tag => Boolean(tag))
})

const hasSelectedTags = computed(() => {
  return selectedTags.value.length > 0
})
</script>

<template>
  <TagBadgeList
    v-if="hasSelectedTags"
    :tags="selectedTags"
  />
</template>
