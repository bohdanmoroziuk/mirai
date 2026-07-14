<script setup lang="ts">
import { useCreateBookmarkWorkflow } from '../workflows/create-bookmark.workflow'
import { toCreateBookmarkInput } from '../mappers/bookmark-input.mapper'
import type { BookmarkFormState } from '../types/bookmark'

const { initialState, isRefreshing, refresh } = useBookmarkFormInitialState()
const { isCreating, createBookmark } = useCreateBookmarkWorkflow()

const [isOpen, toggle] = useToggle()

const open = () => {
  toggle(true)
  refresh()
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
      <template v-if="isRefreshing">
        <div class="flex justify-center">
          <UiLoader />
        </div>
      </template>

      <template v-else>
        <BookmarkForm
          :submitting="isCreating"
          :initial-state="initialState"
          submit-label="Create"
          @submit="handleBookmarkCreate"
          @cancel="close"
        />
      </template>
    </template>
  </UModal>
</template>
