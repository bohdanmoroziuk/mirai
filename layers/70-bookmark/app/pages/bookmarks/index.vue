<script setup lang="ts">
import { useBookmarkQuery } from '../../queries/bookmark.queries'

definePageMeta({
  access: 'private',
  pageTitle: 'Bookmarks',
})

const { bookmarks, error, isFetching } = useBookmarkQuery()
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
        :fetching="isFetching"
        :empty-when="(data) => data?.length === 0"
      >
        <template #fetching>
          <div class="flex justify-center">
            <UiLoader />
          </div>
        </template>

        <template #error="{ error }">
          <BookmarksErrorState :error />
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
