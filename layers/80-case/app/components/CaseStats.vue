<script setup lang="ts">
const { data, error, isPending } = useGetCaseStatsWorkflow()

const statItems = computed(() => {
  return data.value === undefined
    ? []
    : toCaseStatItems(data.value)
})
</script>

<template>
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

    <template #error="{ error: queryError }">
      <p class="text-error text-center">
        {{ queryError.message }}
      </p>
    </template>

    <template #default>
      <div class="flex items-center justify-between gap-4">
        <CaseStatList :items="statItems" />
      </div>
    </template>
  </UiQueryState>
</template>
