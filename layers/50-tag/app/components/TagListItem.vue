<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import { useDeleteTagWorkflow } from '../workflows/delete-tag.workflow'

const props = defineProps<{
  tag: Tag
  number: number
}>()

const { confirm } = useConfirmModal()
const { isDeleting, deleteTag } = useDeleteTagWorkflow()
const icons = useAppIcons()

const handleTagDelete = async () => {
  const confirmed = await confirm({
    title: 'Delete tag?',
    description: 'This tag will be permanently deleted.',
    confirmLabel: 'Delete',
  })

  if (confirmed) {
    await deleteTag(props.tag.id)
  }
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
        :loading="isDeleting"
        :icon="icons.delete"
        size="sm"
        color="error"
        variant="ghost"
        @click="handleTagDelete"
      />
    </div>
  </li>
</template>
