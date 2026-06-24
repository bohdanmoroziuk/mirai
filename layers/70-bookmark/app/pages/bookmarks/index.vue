<script setup lang="ts">
definePageMeta({
  access: 'private',
  pageTitle: 'Bookmarks',
})
</script>

<template>
  <div>
    <div class="flex items-center gap-4">
      <CreateCollectionModal />

      <UButton>Add bookmark</UButton>
    </div>
  </div>
</template>
