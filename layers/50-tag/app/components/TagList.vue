<script setup lang="ts">
defineProps<{
  tags: Tag[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-4">
    <TagListItem
      v-for="(tag, index) of tags"
      :key="tag.id"
      :tag
      :number="index + 1"
    />
  </ul>
</template>
