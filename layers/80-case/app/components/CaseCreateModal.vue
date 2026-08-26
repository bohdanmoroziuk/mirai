<script setup lang="ts">
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
      <CaseCreateForm
        :initial-state
        :submitting="isCreating"
        @cancel="close"
        @submit="handleCaseCreate"
      />
    </template>
  </UModal>
</template>
