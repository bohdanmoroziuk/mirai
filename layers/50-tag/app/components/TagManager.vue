<script setup lang="ts">
import { useTagListWorkflow } from '../workflows/tag-list.workflow'

const {
  search,
  tags,
  isPending,
  error,
} = useTagListWorkflow()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end">
      <TagCreateModal />
    </div>

    <div>
      <TagSearch v-model="search" />
    </div>

    <UiQueryState
      :data="tags"
      :fetching="isPending"
      :error="error"
      :empty-when="isEmpty"
    >
      <template #fetching>
        <div class="flex justify-center">
          <UiLoader />
        </div>
      </template>

      <template #empty>
        <p class="text-muted text-center">
          No tags yet. Try to add one.
        </p>
      </template>

      <template #default="{ data }">
        <TagList :tags="data" />
      </template>
    </UiQueryState>
  </div>
</template>
