<script setup lang="ts">
import { set } from '@vueuse/core'
import { toUpdateBookmarkInput } from '../mappers/bookmark-input.mapper'
import { useUpdateBookmarkWorkflow } from '../workflows/update-bookmark.workflow'
import type { BookmarkFormState } from '../types/bookmark'

const props = defineProps<{
  bookmarkId: string
}>()

const emit = defineEmits<{
  closed: []
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const close = () => {
  set(isOpen, false)
}

const { initialState, isRefreshing, error } = useUpdateBookmarkFormInitialState(() => props.bookmarkId)
const { isUpdating, updateBookmark } = useUpdateBookmarkWorkflow()

const handleBookmarkUpdate = async (state: BookmarkFormState) => {
  const updateBookmarkInput = toUpdateBookmarkInput(props.bookmarkId, state)
  const success = await updateBookmark(updateBookmarkInput)

  if (success) {
    close()
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :close="{ onClick: close }"
    title="Update bookmark"
    @after:leave="emit('closed')"
  >
    <template #body>
      <UiQueryState
        :error="error"
        :fetching="isRefreshing"
      >
        <template #fetching>
          <div class="flex justify-center">
            <UiLoader />
          </div>
        </template>

        <template #error="{ error: queryError }">
          <p class="text-error text-center">
            {{ queryError.message }}
          </p>
        </template>

        <template #default>
          <BookmarkForm
            :submitting="isUpdating"
            :initial-state="initialState"
            submit-label="Update"
            @submit="handleBookmarkUpdate"
            @cancel="close"
          />
        </template>
      </UiQueryState>
    </template>
  </UModal>
</template>
