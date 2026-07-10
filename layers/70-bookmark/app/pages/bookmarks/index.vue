<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useBookmarkListWorkflow } from '../../workflows/bookmark-list.workflow'

definePageMeta({
  access: 'private',
  pageTitle: 'Bookmarks',
})

const collectionId = useRouteQuery<Nullish<string>>('collectionId', undefined)

const {
  bookmarks,
  error,
  isPending,
} = useBookmarkListWorkflow(collectionId)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4">
      <CreateCollectionModal />

      <CreateBookmarkModal />
    </div>

    <div>
      <UiQueryState
        :data="bookmarks"
        :error="error"
        :fetching="isPending"
        :empty-when="isEmpty"
      >
        <template #fetching>
          <div class="flex justify-center">
            <UiLoader />
          </div>
        </template>

        <template #error="{ error: queryError }">
          <BookmarksErrorState :error="queryError" />
        </template>

        <template #empty>
          <BookmarksEmptyState />
        </template>

        <template #default="{ data }">
          <BookmarksView :bookmarks="data" />
        </template>
      </UiQueryState>
    </div>
  </div>
</template>
