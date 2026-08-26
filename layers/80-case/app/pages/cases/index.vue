<script setup lang="ts">
definePageMeta({
  pageTitle: 'Cases',
})

const { data, error, isPending } = useGetCaseStatsWorkflow()
</script>

<template>
  <div>
    <UiQueryState
      :data="data"
      :error="error"
      :fetching="isPending"
      :empty-when="isEmpty"
    >
      <template #fetching>
        <div class="flex justify-center">
          <UiLoader />
        </div>
      </template>

      <template #default="{ data: stats }">
        <CaseStats :stats />
      </template>
    </UiQueryState>
  </div>
</template>
