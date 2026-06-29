<script setup lang="ts">
import { toGetTagsInput } from '../mappers/tag-input.mapper'
import { useTagsQuery } from '../queries/tag.queries'

const search = ref('')
const debouncedSearch = refDebounced(search, 500)

const tagsQueryInput = computed(() => {
  return toGetTagsInput({
    search: debouncedSearch.value,
  })
})

const { tags, loading, error } = useTagsQuery(tagsQueryInput)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end">
      <CreateTagModal />
    </div>

    <div>
      <TagSearch v-model="search" />
    </div>

    <UiQueryState
      :data="tags"
      :fetching="loading"
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
