<script setup lang="ts">
import { useDeleteBookmarkMutation } from '../queries/bookmark.queries'

const props = defineProps<{
  bookmark: Bookmark
}>()

const notification = useNotification()
const { confirm } = useConfirmModal()
const { deleteBookmark, isPending } = useDeleteBookmarkMutation()

const handleBookmarkDelete = async () => {
  await confirm({
    title: 'Delete bookmark?',
    description: 'This bookmark will be permanently deleted.',
    confirmLabel: 'Delete',

    onConfirm: async () => {
      await deleteBookmark(props.bookmark.id)

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
  <div class="flex flex-col p-2 gap-2 shadow-xs hover:shadow-md rounded-sm overflow-hidden">
    <main class="flex-1">
      <h3 class="text-primary">
        {{ bookmark.title }}
      </h3>

      <p class="text-sm font-medium">
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
          icon="i-lucide-edit"
          size="sm"
          color="info"
          variant="outline"
        />
        <UButton
          icon="i-lucide-trash-2"
          size="sm"
          color="error"
          variant="solid"
          :loading="isPending"
          @click.stop="handleBookmarkDelete"
        />
      </div>
    </footer>
  </div>
</template>
