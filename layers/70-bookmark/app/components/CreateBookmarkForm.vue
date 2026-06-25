<script setup lang="ts">
import type { CreateBookmarkInput, CreateBookmarkFormState } from '../types/bookmark'

defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [input: CreateBookmarkInput]
  cancel: []
}>()

const state = reactive<CreateBookmarkFormState>({
  title: '',
  description: '',
  url: '',
  isFavorite: false,
  collectionId: undefined,
  tagIds: [],
})

const submit = () => {
  emit('submit', toValue(state))
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <UForm
    :state="state"
    class="space-y-4"
    @submit="submit"
  >
    <UFormField
      label="Title"
    >
      <UInput
        v-model="state.title"
        placeholder="Enter title"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Description"
    >
      <UTextarea
        v-model="state.description"
        :rows="4"
        placeholder="Enter description"
        class="w-full"
        autoresize
      />
    </UFormField>

    <UFormField
      label="Url"
    >
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

    <UFormField
      label="Collection"
    >
      <CollectionSelectMenu
        v-model="state.collectionId"
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
        Submit
      </UButton>
    </div>
  </UForm>
</template>
