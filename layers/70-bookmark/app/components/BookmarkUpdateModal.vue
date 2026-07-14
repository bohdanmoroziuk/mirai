<script setup lang="ts">
import { toUpdateBookmarkInput } from '../mappers/bookmark-input.mapper'
import { useUpdateBookmarkWorkflow } from '../workflows/update-bookmark.workflow'
import type { BookmarkFormState } from '../types/bookmark'

const props = defineProps<{
  bookmarkId: string
}>()

const emit = defineEmits<{
  'close': []
  'after:leave': []
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const closeModal = () => {
  emit('close')
}

const { initialState, isRefreshing, error } = useUpdateBookmarkFormInitialState(() => props.bookmarkId)
const { isUpdating, updateBookmark } = useUpdateBookmarkWorkflow()

const handleBookmarkUpdate = async (state: BookmarkFormState) => {
  const updateBookmarkInput = toUpdateBookmarkInput(props.bookmarkId, state)
  const success = await updateBookmark(updateBookmarkInput)

  if (success) {
    closeModal()
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :close="{ onClick: closeModal }"
    title="Update bookmark"
    @after:leave="emit('after:leave')"
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
            @cancel="closeModal"
          />
        </template>
      </UiQueryState>
    </template>
  </UModal>
</template>
