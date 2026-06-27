<script setup lang="ts">
import { toCreateBookmarkInput } from '../mappers/bookmark-input.mapper'
import { getBookmarkFormInitialState } from '../mappers/bookmark.mapper'
import { useCreateBookmarkMutation } from '../queries/bookmark.queries'
import type { BookmarkFormState } from '../types/bookmark'

const notification = useNotification()
const [isOpen, toggle] = useToggle()
const { createBookmark, loading } = useCreateBookmarkMutation()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const initialState = getBookmarkFormInitialState()

const handleBookmarkCreate = async (state: BookmarkFormState) => {
  try {
    await createBookmark(toCreateBookmarkInput(state))

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
      <BookmarkForm
        :loading
        :initial-state
        @submit="handleBookmarkCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
