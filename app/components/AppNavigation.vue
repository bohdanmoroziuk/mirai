<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { items: collectionItems } = useCollectionNavigationItems()

const items = computed<NavigationMenuItem[]>(() => {
  return [
    {
      label: 'Today',
      to: '/',
      icon: 'i-lucide-house',
    },
    {
      label: 'Bookmarks',
      to: '/bookmarks',
      icon: 'i-lucide-inbox',
      badge: collectionItems.value.length.toString(),
      children: collectionItems.value,
    },
  ]
})
</script>

<template>
  <UNavigationMenu
    type="single"
    :items="items"
    orientation="vertical"
    :ui="{ link: 'p-1.5 overflow-hidden' }"
  />
</template>
