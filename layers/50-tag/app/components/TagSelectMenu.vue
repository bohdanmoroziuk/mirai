<script setup lang="ts">
const value = defineModel<string[]>({ default: () => [] })

const { items, isPending } = useTagSelectItems()
</script>

<template>
  <USelectMenu
    v-model="value"
    :loading="isPending"
    :items
    placeholder="Select tags"
    value-key="value"
    multiple
    clear
  />
</template>
