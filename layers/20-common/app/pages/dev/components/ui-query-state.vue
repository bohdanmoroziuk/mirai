<script setup lang="ts">
definePageMeta({
  devOnly: true,
  layout: false,
})

type Bookmark = {
  id: string
  title: string
}

const fetchingBookmarks = ref<Bookmark[]>()
const emptyBookmarks = ref<Bookmark[]>([])
const loadedBookmarks = ref<Bookmark[]>([
  {
    id: '1',
    title: 'Nuxt UI documentation',
  },
  {
    id: '2',
    title: 'TanStack Query documentation',
  },
])

const queryError = ref(new Error('Failed to load bookmarks.'))

const emptyWhenNoBookmarks = (bookmarks?: Bookmark[]) => {
  return !bookmarks?.length
}
</script>

<template>
  <UContainer class="space-y-8 py-8">
    <div class="space-y-2">
      <UButton
        to="/dev/components"
        variant="ghost"
        icon="i-lucide-arrow-left"
      >
        Components
      </UButton>

      <h1 class="text-2xl font-semibold">
        UiQueryState
      </h1>

      <p class="text-muted">
        Handles fetching, error, empty and success states.
      </p>
    </div>

    <UCard>
      <template #header>
        Fetching state
      </template>

      <UiQueryState
        :data="fetchingBookmarks"
        fetching
        :empty-when="emptyWhenNoBookmarks"
      >
        <template #fetching>
          <p class="text-sm text-muted">
            Loading bookmarks...
          </p>
        </template>
      </UiQueryState>
    </UCard>

    <UCard>
      <template #header>
        Error state
      </template>

      <UiQueryState
        :data="fetchingBookmarks"
        :error="queryError"
        :empty-when="emptyWhenNoBookmarks"
      >
        <template #error="{ error }">
          <p class="text-sm text-error">
            {{ error.message }}
          </p>
        </template>
      </UiQueryState>
    </UCard>

    <UCard>
      <template #header>
        Empty state
      </template>

      <UiQueryState
        :data="emptyBookmarks"
        :empty-when="emptyWhenNoBookmarks"
      >
        <template #empty>
          <div class="space-y-1">
            <p class="font-medium">
              No bookmarks
            </p>

            <p class="text-sm text-muted">
              Create your first bookmark to get started.
            </p>
          </div>
        </template>
      </UiQueryState>
    </UCard>

    <UCard>
      <template #header>
        Success state
      </template>

      <UiQueryState
        :data="loadedBookmarks"
        :empty-when="emptyWhenNoBookmarks"
      >
        <template #default="{ data: bookmarks }">
          <ul class="space-y-2">
            <li
              v-for="bookmark in bookmarks"
              :key="bookmark.id"
              class="rounded-md border border-default px-3 py-2 text-sm"
            >
              {{ bookmark.title }}
            </li>
          </ul>
        </template>
      </UiQueryState>
    </UCard>
  </UContainer>
</template>
