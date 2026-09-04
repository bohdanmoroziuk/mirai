<script setup lang="ts">
const props = defineProps<{
  caseId: string
}>()

const {
  data,
  error,
  isPending,
} = useStepList(() => props.caseId)
</script>

<template>
  <UiQueryState
    :data
    :error
    :fetching="isPending"
    :empty-when="isEmpty"
  >
    <template #default="{ data: steps }">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">
            Steps
          </h3>

          <UButton
            icon="i-lucide-plus"
            label="Add case"
            color="primary"
          />
        </div>

        <StepList :steps />
      </div>
    </template>
  </UiQueryState>
</template>
