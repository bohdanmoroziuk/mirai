<script setup lang="ts">
import { getCaseFormInitialState } from '../mappers/case.mapper'
import type { CaseFormState } from '../types/case'

const initialState = getCaseFormInitialState()
const { isCreating, createCase } = useCreateCaseWorkflow()
const { isOpen, open, close } = useModalState()

const handleCaseCreate = async (state: CaseFormState) => {
  const success = await createCase(toCreateCaseInput(state))

  if (success) {
    close()
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Create case"
    description="Create a new case you want to track over time"
  >
    <template #default>
      <UButton
        icon="i-lucide-plus"
        label="New case"
        color="primary"
        @click="open"
      />
    </template>

    <template #body>
      <CaseForm
        :initial-state
        :submitting="isCreating"
        @cancel="close"
        @submit="handleCaseCreate"
      />
    </template>
  </UModal>
</template>
