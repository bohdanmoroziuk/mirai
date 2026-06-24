<script setup lang="ts">
defineProps<{
  bookmark: Bookmark
}>()
</script>

<template>
  <div class="flex flex-col gap-2 shadow-xs hover:shadow-md rounded-sm overflow-hidden">
    <header>
      <img
        class="object-cover"
        src="https://miro.medium.com/v2/resize:fit:3584/format:webp/1*OdZr-XfgTDXBCtU4c1EDxg.png"
        alt=""
      >
    </header>

    <main class="flex-1 px-2">
      <h3 class="text-primary">
        {{ bookmark.title }}
      </h3>

      <p class="text-sm font-medium">
        {{ bookmark.description }}
      </p>

      <ULink
        class="text-sm"
        :to="bookmark.url"
        external
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ getHostname(bookmark.url) }}
      </ULink>
    </main>

    <footer class="p-2 pt-0">
      <div class="flex items-center justify-end gap-2">
        <UButton
          :to="bookmark.url"
          external
          target="_blank"
          rel="noopener noreferrer"
          icon="i-lucide-view"
          size="sm"
          color="primary"
          variant="outline"
        />
        <UButton
          icon="i-lucide-edit"
          size="sm"
          color="info"
          variant="outline"
        />
        <UButton
          icon="i-lucide-trash-2"
          size="sm"
          color="error"
          variant="solid"
        />
      </div>
    </footer>
  </div>
</template>
