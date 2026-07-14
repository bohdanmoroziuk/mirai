<script setup lang="ts">
defineProps<{
  bookmark: Bookmark
}>()

const emit = defineEmits<{
  update: [bookmarkId: string]
  delete: [bookmarkId: string]
}>()
</script>

<template>
  <div class="flex flex-col p-2 gap-2 min-h-44 shadow-xs hover:shadow-md rounded-sm overflow-hidden">
    <main class="flex-1 flex flex-col gap-1">
      <h3
        class="text-primary line-clamp-1"
        :title="bookmark.title"
      >
        {{ bookmark.title }}
      </h3>

      <p
        class="text-sm font-medium line-clamp-2"
        :title="bookmark.description"
      >
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

      <TagBadges :tag-ids="bookmark.tagIds" />
    </main>

    <footer>
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
          variant="solid"
          @click.stop="emit('update', bookmark.id)"
        />
        <UButton
          icon="i-lucide-trash-2"
          size="sm"
          color="error"
          variant="solid"
          @click.stop="emit('delete', bookmark.id)"
        />
      </div>
    </footer>
  </div>
</template>
