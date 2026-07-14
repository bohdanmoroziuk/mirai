<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { TagFormState } from '../types/tag'
import { tagFormStateSchema } from '../schemas/tag.schema'

const props = defineProps<{
  submitting?: boolean
  initialState: TagFormState
}>()

const emit = defineEmits<{
  submit: [state: TagFormState]
  cancel: []
}>()

const state = reactive<TagFormState>({ ...props.initialState })

const submit = (event: FormSubmitEvent<TagFormState>) => {
  emit('submit', event.data)
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <UForm
    :schema="tagFormStateSchema"
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
        :disabled="submitting"
        @click="cancel"
      >
        Cancel
      </UButton>

      <UButton
        :loading="submitting"
        type="submit"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>
