<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import { useDeleteTagMutation } from '../queries/tag.queries'
import { toDeleteTagInput } from '../mappers/tag-input.mapper'

const props = defineProps<{
  tag: Tag
  number: number
}>()

const notification = useNotification()
const { confirm } = useConfirmModal()
const { loading, deleteTag } = useDeleteTagMutation()

const handleTagDelete = async () => {
  await confirm({
    title: 'Delete tag?',
    description: 'This tag will be permanently deleted.',
    confirmLabel: 'Delete',

    async onConfirm() {
      await deleteTag(toDeleteTagInput(props.tag.id))

      notification.success({
        title: 'Tag has been deleted successfully',
      })
    },

    onError(error) {
      notification.error({
        title: 'Operation failed!',
        description: getErrorMessage(error),
      })
    },
  })
}
</script>

<template>
  <li class="flex items-center gap-8 px-4 py-2 shadow-xs hover:shadow-sm">
    <div>
      #{{ number }}
    </div>

    <div class="flex-1">
      <TagBadge :color="tag.color">
        {{ tag.name }}
      </TagBadge>
    </div>

    <div class="text-muted text-sm">
      Created {{ formatTimeAgo(new Date(tag.createdAt)) }}
    </div>

    <div class="flex gap-2">
      <UButton
        icon="i-lucide-edit"
        size="sm"
        color="info"
        variant="ghost"
      />

      <UButton
        :loading
        icon="i-lucide-trash-2"
        size="sm"
        color="error"
        variant="ghost"
        @click="handleTagDelete"
      />
    </div>
  </li>
</template>
