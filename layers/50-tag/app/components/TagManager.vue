<script setup lang="ts">
import { useTagsQuery } from '../queries/tag.queries'

const { tags, isFetching, error } = useTagsQuery()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end">
      <CreateTagModal />
    </div>

    <div>
      <UInput
        placeholder="Search..."
        class="w-full"
      />
    </div>

    <UiQueryState
      :data="tags"
      :fetching="isFetching"
      :error="error"
      :empty-when="(data) => data?.length === 0"
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
