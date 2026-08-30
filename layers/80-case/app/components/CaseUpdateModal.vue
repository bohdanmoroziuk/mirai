<script setup lang="ts">
import { set } from '@vueuse/core'
import type { CaseFormState } from '../types/case'

const props = defineProps<{
  caseId: string
}>()

const emit = defineEmits<{
  closed: []
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const close = () => {
  set(isOpen, false)
}

const { initialState, isRefreshing, error } = useUpdateCaseFormInitialState(() => props.caseId)
const { isUpdating, updateCase } = useUpdateCaseWorkflow()

const handleCaseUpdate = async (state: CaseFormState) => {
  const updateCaseInput = toUpdateCaseInput(props.caseId, state)
  const success = await updateCase(updateCaseInput)

  if (success) {
    close()
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :close="{ onClick: close }"
    title="Update case"
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
          <CaseForm
            :submitting="isUpdating"
            :initial-state="initialState"
            submit-label="Update"
            @submit="handleCaseUpdate"
            @cancel="close"
          />
        </template>
      </UiQueryState>
    </template>
  </UModal>
</template>
