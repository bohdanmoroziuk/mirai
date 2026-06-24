<script setup lang="ts">
</script>

<template>
  <div class="flex flex-1">
    <AppSidebar />

    <div class="flex-1 flex flex-col">
      <AppHeader />

      <div class="flex-1 p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
