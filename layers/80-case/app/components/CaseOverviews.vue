<script setup lang="ts">
import { set } from '@vueuse/core'

const { data, error, isPending } = useGetCaseOverviewsWorkflow()
const { deleteCase } = useDeleteCaseWorkflow()
const { isOpen, open } = useModalState()
const { confirm } = useConfirmModal()

const selectedCaseId = ref<Nullable<string>>(null)

const handleCaseOpen = async (caseId: string) => {
  await navigateTo({
    name: 'cases-caseId',
    params: {
      caseId,
    },
  })
}

const handleCaseUpdate = (caseId: string) => {
  set(selectedCaseId, caseId)
  open()
}

const cleanupCaseUpdate = () => {
  if (toValue(isOpen)) return

  set(selectedCaseId, null)
}

const handleCaseDelete = async (caseId: string) => {
  const isConfirmed = await confirm({
    title: 'Delete case',
    description: 'Are you sure you want to delete this case?',
    confirmLabel: 'Delete',
  })

  if (isConfirmed) {
    await deleteCase(caseId)
  }
}

shareCaseOverviewsContext({
  openCase: handleCaseOpen,
  updateCase: handleCaseUpdate,
  deleteCase: handleCaseDelete,
})
</script>

<template>
  <UiQueryState
    :data
    :error
    :fetching="isPending"
    :empty-when="isEmpty"
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

    <template #default="{ data: caseOverviews }">
      <CaseOverviewList :case-overviews />
    </template>
  </UiQueryState>

  <template v-if="selectedCaseId">
    <LazyCaseUpdateModal
      v-model:open="isOpen"
      :case-id="selectedCaseId"
      @closed="cleanupCaseUpdate"
    />
  </template>
</template>
