<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useCollectionMenuItems } from '@collection/app/composables/useCollectionMenuItems'

const { collectionMenuItems } = useCollectionMenuItems()

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
      badge: collectionMenuItems.value.length.toString(),
      children: collectionMenuItems.value,
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
