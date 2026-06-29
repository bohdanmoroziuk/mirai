<script setup lang="ts">
import { toDeleteBookmarkInput } from '../mappers/bookmark-input.mapper'
import { useDeleteBookmarkMutation } from '../queries/bookmark.queries'

const props = defineProps<{
  bookmark: Bookmark
}>()

const notification = useNotification()
const { confirm } = useConfirmModal()
const { deleteBookmark, loading } = useDeleteBookmarkMutation()

const handleBookmarkDelete = async () => {
  await confirm({
    title: 'Delete bookmark?',
    description: 'This bookmark will be permanently deleted.',
    confirmLabel: 'Delete',

    onConfirm: async () => {
      await deleteBookmark(toDeleteBookmarkInput(props.bookmark.id))

      notification.success({
        title: 'Bookmark has been deleted successfully',
      })
    },

    onError: (error) => {
      notification.error({
        title: 'Operation failed!',
        description: getErrorMessage(error),
      })
    },
  })
}
</script>

<template>
  <div class="flex flex-col p-2 gap-2 min-h-44 shadow-xs hover:shadow-md rounded-sm overflow-hidden">
    <main class="flex-1 flex flex-col gap-1">
      <h3
        class="text-primary line-clamp-1"
        :title="bookmark.title"
      >
        {{ bookmark.title }}
      </h3>

      <p
        class="text-sm font-medium line-clamp-2"
        :title="bookmark.description"
      >
        {{ bookmark.description }}
      </p>

      <ULink
        class="text-sm"
        :to="bookmark.url"
        external
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ getHostname(bookmark.url) }}
      </ULink>

      <TagBadges :tag-ids="bookmark.tagIds" />
    </main>

    <footer>
      <div class="flex items-center justify-end gap-2">
        <UButton
          :to="bookmark.url"
          external
          target="_blank"
          rel="noopener noreferrer"
          icon="i-lucide-view"
          size="sm"
          color="primary"
          variant="outline"
        />
        <UButton
          icon="i-lucide-trash-2"
          size="sm"
          color="error"
          variant="solid"
          :loading="loading"
          @click.stop="handleBookmarkDelete"
        />
      </div>
    </footer>
  </div>
</template>
