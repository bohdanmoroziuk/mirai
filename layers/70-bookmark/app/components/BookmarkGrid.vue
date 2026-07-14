<script setup lang="ts">
defineProps<{
  bookmarks: Bookmark[]
}>()

const emit = defineEmits<{
  'update-bookmark': [bookmarkId: string]
  'delete-bookmark': [bookmarkId: string]
}>()
</script>

<template>
  <div class="grid grid-cols-5 gap-4">
    <BookmarkCard
      v-for="bookmark of bookmarks"
      :key="bookmark.id"
      :bookmark="bookmark"
      @update="emit('update-bookmark', $event)"
      @delete="emit('delete-bookmark', $event)"
    />
  </div>
</template>
