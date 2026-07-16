<script setup lang="ts">
const search = defineModel<string>({ default: '' })
const icons = useAppIcons()

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
    :icon="icons.search"
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
        :icon="icons.clear"
        aria-label="Clear input"
        @click="resetSearch"
      />
    </template>
  </UInput>
</template>
