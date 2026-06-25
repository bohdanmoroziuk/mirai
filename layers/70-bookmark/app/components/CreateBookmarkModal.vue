<script setup lang="ts">
import { useCreateBookmarkMutation } from '../queries/bookmark.queries'
import type { CreateBookmarkInput } from '../types/bookmark'

const toast = useToast()
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

    toast.add({
      title: 'Bookmark has been created',
      color: 'success',
    })

    close()
  }
  catch (error) {
    toast.add({
      title: 'Operation failed!',
      description: getErrorMessage(error),
      color: 'error',
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
