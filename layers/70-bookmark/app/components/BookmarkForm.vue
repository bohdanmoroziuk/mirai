<script setup lang="ts">
import { bookmarkPayloadSchema } from '../schemas/bookmark.schema'
import type { BookmarkFormState } from '../types/bookmark'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    submitLabel?: string
    initialState: BookmarkFormState
  }>(),
  {
    loading: false,
    submitLabel: 'Submit',
  },
)

const emit = defineEmits<{
  submit: [input: BookmarkFormState]
  cancel: []
}>()

const state = reactive<BookmarkFormState>({ ...props.initialState })

const submit = () => {
  emit('submit', toValue(state))
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <UForm
    :schema="bookmarkPayloadSchema"
    :state="state"
    class="space-y-4"
    @submit="submit"
  >
    <UFormField label="Title">
      <UInput
        v-model="state.title"
        placeholder="Enter title"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Description">
      <UTextarea
        v-model="state.description"
        :rows="4"
        placeholder="Enter description"
        class="w-full"
        autoresize
      />
    </UFormField>

    <UFormField label="Url">
      <UInput
        v-model="state.url"
        type="url"
        placeholder="Enter url"
        class="w-full"
      />
    </UFormField>

    <UCheckbox
      v-model="state.isFavorite"
      label="Favorite"
    />

    <UFormField label="Collection">
      <CollectionSelectMenu
        v-model="state.collectionId"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Tags">
      <TagSelectMenu
        v-model="state.tagIds"
        class="w-full"
      />
    </UFormField>

    <div class="flex items-center justify-end gap-4">
      <UButton
        variant="outline"
        color="error"
        @click="cancel"
      >
        Cancel
      </UButton>

      <UButton
        :loading
        type="submit"
      >
        {{ submitLabel }}
      </UButton>
    </div>
  </UForm>
</template>
