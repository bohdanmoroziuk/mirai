<script setup lang="ts">
import { useCreateBookmarkMutation } from '../queries/bookmark.queries'
import type { CreateBookmarkInput } from '../types/bookmark'

const notification = useNotification()
const [isOpen, toggle] = useToggle()
const { createBookmark, isPending } = useCreateBookmarkMutation()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const handleBookmarkCreate = async (input: CreateBookmarkInput) => {
  try {
    await createBookmark(input)

    notification.success({
      title: 'Bookmark has been created',
    })

    close()
  }
  catch (error) {
    notification.error({
      title: 'Operation failed!',
      description: getErrorMessage(error),
    })
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Create bookmark"
  >
    <template #default>
      <UButton
        label="Create bookmark"
        color="primary"
        @click="open"
      />
    </template>

    <template #body>
      <CreateBookmarkForm
        :loading="isPending"
        @submit="handleBookmarkCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
