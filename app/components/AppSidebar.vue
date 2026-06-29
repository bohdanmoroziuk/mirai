<script setup lang="ts">
const { open } = useAppSidebar()
</script>

<template>
  <USidebar
    v-model:open="open"
    collapsible="icon"
  >
    <template #header>
      <UIcon
        name="i-logos-nuxt-icon"
        class="size-8"
      />
    </template>

    <template #default>
      <AppNavigation />
    </template>

    <template #footer>
      <UserMenu />
    </template>
  </USidebar>
</template>
