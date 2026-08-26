<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    submitting?: boolean
    submitLabel?: string
    initialState: CaseFormState
  }>(),
  {
    submitting: false,
    submitLabel: 'Submit',
  },
)

const emit = defineEmits<{
  submit: [input: CaseFormState]
  cancel: []
}>()

const { state, resetState } = useFormState<CaseFormState>(() => props.initialState)

const submit = () => {
  emit('submit', toValue(state))
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
    :schema="caseFormStateSchema"
    :state="state"
    class="space-y-4"
    @submit="submit"
  >
    <UFormField
      label="Title"
      name="title"
    >
      <UInput
        v-model="state.title"
        placeholder="e. g. Prepare for vacation"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Description"
      name="description"
      hint="Optional"
    >
      <UTextarea
        v-model="state.description"
        :rows="4"
        placeholder="Add context or describe the expected outcome..."
        class="w-full"
        autoresize
      />
    </UFormField>

    <div class="flex items-center justify-end gap-4">
      <UButton
        :disabled="submitting"
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
        {{ submitLabel }}
      </UButton>
    </div>
  </UForm>
</template>
