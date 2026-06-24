<script setup lang="ts">
const { toggle } = useAppSidebar()
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

    <p class="font-medium">
      Bookmarks
    </p>
  </div>
</template>
