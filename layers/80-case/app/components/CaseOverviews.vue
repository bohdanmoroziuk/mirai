<script setup lang="ts">
const { data, error, isPending } = useGetCaseOverviewsWorkflow()
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

    <template #default="{ data: caseOverviews }">
      <CaseOverviewList :case-overviews />
    </template>
  </UiQueryState>
</template>
