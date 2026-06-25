<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import { useCollectionsQuery } from '../queries/collection.queries'

const { collections, isFetching } = useCollectionsQuery()

const value = defineModel<Nullish<string>>({ default: undefined })

const toMenuItem = (collection: Collection): SelectMenuItem => {
  return {
    label: collection.title,
    value: collection.id,
  }
}

const menuItems = computed(() => {
  return collections.value.map(toMenuItem)
})
</script>

<template>
  <USelectMenu
    v-model="value"
    :items="menuItems"
    :loading="isFetching"
    value-key="value"
    placeholder="Select collection"
    clear
  />
</template>
