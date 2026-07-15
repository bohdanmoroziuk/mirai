<script setup lang="ts">
import { set } from '@vueuse/core'
import { useBookmarkListWorkflow } from '../workflows/bookmark-list.workflow'
import { useDeleteBookmarkWorkflow } from '../workflows/delete-bookmark.workflow'

const props = defineProps<{
  collectionId: Optional<string>
}>()

const { bookmarks, error, isPending } = useBookmarkListWorkflow(() => props.collectionId)
const { deleteBookmark } = useDeleteBookmarkWorkflow()
const { isOpen, open } = useModalState()
const { confirm } = useConfirmModal()

const selectedBookmarkId = ref<Nullable<string>>(null)

const openUpdateModal = (bookmarkId: string) => {
  set(selectedBookmarkId, bookmarkId)
  open()
}

const cleanupUpdateModal = () => {
  if (toValue(isOpen)) return
  set(selectedBookmarkId, null)
}

const handleBookmarkDelete = async (bookmarkId: string) => {
  const confirmed = await confirm({
    title: 'Delete bookmark?',
    description: 'This bookmark will be permanently deleted.',
    confirmLabel: 'Delete',
  })

  if (confirmed) {
    await deleteBookmark(bookmarkId)
  }
}
</script>

<template>
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

      <template #default="{ data: queryBookmarks }">
        <BookmarkGrid
          :bookmarks="queryBookmarks"
          @update-bookmark="openUpdateModal"
          @delete-bookmark="handleBookmarkDelete"
        />
      </template>
    </UiQueryState>
  </div>

  <template v-if="selectedBookmarkId">
    <LazyBookmarkUpdateModal
      v-model:open="isOpen"
      :bookmark-id="selectedBookmarkId"
      @closed="cleanupUpdateModal"
    />
  </template>
</template>
