<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CollectionFormState } from '../types/collection'
import { collectionFormStateSchema } from '../schemas/collection.schema'

const props = defineProps<{
  submitting?: boolean
  initialState: CollectionFormState
}>()

const emit = defineEmits<{
  submit: [state: CollectionFormState]
  cancel: []
}>()

const { state, resetState } = useFormState<CollectionFormState>(() => props.initialState)

const submit = (event: FormSubmitEvent<CollectionFormState>) => {
  emit('submit', event.data)
}

const cancel = () => {
  emit('cancel')
}

defineExpose({
  resetState,
})
</script>

<template>
  <UForm
    :schema="collectionFormStateSchema"
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
        :loading="submitting"
        type="submit"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>
