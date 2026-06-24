<script setup lang="ts">
const route = useRoute()
const { toggle } = useAppSidebar()

const pageTitle = computed(() => {
  return route.meta.pageTitle
})
</script>

<template>
  <div class="h-(--ui-header-height) shrink-0 flex items-center gap-2 px-4 border-b border-default">
    <UButton
      icon="i-lucide-panel-left"
      color="neutral"
      variant="ghost"
      aria-label="Toggle sidebar"
      @click="toggle"
    />

    <p
      v-if="pageTitle"
      class="font-medium"
    >
      {{ pageTitle }}
    </p>
  </div>
</template>
