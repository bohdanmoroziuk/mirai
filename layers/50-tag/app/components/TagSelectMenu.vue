<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import { useTagsQuery } from '../queries/tag.queries'

const { tags, loading } = useTagsQuery()

const value = defineModel<string[]>({ default: [] })

const toMenuItem = (tag: Tag): SelectMenuItem => {
  return {
    label: tag.name,
    value: tag.id,
  }
}

const items = computed(() => {
  return tags.value.map(toMenuItem)
})
</script>

<template>
  <USelectMenu
    v-model="value"
    :loading
    :items
    placeholder="Select tags"
    value-key="value"
    multiple
    clear
  />
</template>
