<script setup lang="ts">
import type { CreateCollectionFormState, CreateCollectionInput } from '../types/collection'

defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [input: CreateCollectionInput]
  cancel: []
}>()

const state = reactive<CreateCollectionFormState>({
  title: '',
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
        placeholder="Enter a collection title"
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
