<script setup lang="ts">
import type { TagFormState, CreateTagInput } from '../types/tag'

const props = defineProps<{
  loading?: boolean
  initialState: TagFormState
}>()

const emit = defineEmits<{
  submit: [input: CreateTagInput]
  cancel: []
}>()

const state = reactive<TagFormState>({ ...props.initialState })

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
    <UFormField label="Title">
      <UInput
        v-model="state.name"
        placeholder="Enter name"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Color">
      <TagColorPicker v-model="state.color" />
    </UFormField>

    <div class="flex items-center justify-end gap-4">
      <UButton
        variant="outline"
        color="error"
        :disabled="loading"
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
