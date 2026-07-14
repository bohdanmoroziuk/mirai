<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'

definePageMeta({
  access: 'private',
  pageTitle: 'Bookmarks',
})

const collectionId = useRouteQuery<Optional<string>>('collectionId', undefined)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4">
      <CollectionCreateModal />

      <BookmarkCreateModal />
    </div>

    <BookmarksContainer :collection-id="collectionId" />
  </div>
</template>
