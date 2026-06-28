<script setup lang="ts">
const search = defineModel<string>({ default: '' })

const hasSearch = computed(() => {
  return search.value.length > 0
})

const resetSearch = () => {
  search.value = ''
}
</script>

<template>
  <UInput
    v-model.trim="search"
    class="w-full"
    icon="i-lucide-search"
    placeholder="Search tags..."
    :ui="{ trailing: 'pe-1' }"
  >
    <template
      v-if="hasSearch"
      #trailing
    >
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="resetSearch"
      />
    </template>
  </UInput>
</template>
