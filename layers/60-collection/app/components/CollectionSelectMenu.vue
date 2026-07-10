<script setup lang="ts">
const value = defineModel<Nullish<string>>({ default: undefined })

const { items, isPending } = useCollectionSelectItems()
</script>

<template>
  <USelectMenu
    v-model="value"
    :items="items"
    :loading="isPending"
    value-key="value"
    placeholder="Select collection"
    clear
  />
</template>
