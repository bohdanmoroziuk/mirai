<script setup lang="ts">
defineProps<{
  bookmarks: Bookmark[]
}>()
</script>

<template>
  <div class="grid grid-cols-5 gap-4">
    <BookmarkCard
      v-for="bookmark of bookmarks"
      :key="bookmark.id"
      :bookmark
    />
  </div>
</template>
