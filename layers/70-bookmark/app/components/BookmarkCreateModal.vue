<script setup lang="ts">
import { useCreateBookmarkWorkflow } from '../workflows/create-bookmark.workflow'
import { getBookmarkFormInitialState } from '../mappers/bookmark.mapper'
import { toCreateBookmarkInput } from '../mappers/bookmark-input.mapper'
import type { BookmarkFormState } from '../types/bookmark'

const bookmarkFormInitialState = getBookmarkFormInitialState()
const { isCreating, createBookmark } = useCreateBookmarkWorkflow()

const [isOpen, toggle] = useToggle()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const handleBookmarkCreate = async (state: BookmarkFormState) => {
  const success = await createBookmark(toCreateBookmarkInput(state))

  if (success) {
    close()
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
        :submitting="isCreating"
        :initial-state="bookmarkFormInitialState"
        @submit="handleBookmarkCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
