<script setup lang="ts">
import type { TagFormState } from '../types/tag'
import { useCreateTag } from '../workflows/create-tag.workflow'

const { tagFormInitialState, loading, createTag } = useCreateTag()

const [isOpen, toggle] = useToggle()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const handleTagCreate = async (state: TagFormState) => {
  const success = await createTag(state)

  if (success) {
    close()
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Create tag"
  >
    <template #default>
      <UButton
        label="Create tag"
        color="primary"
        @click="open"
      />
    </template>

    <template #body>
      <TagForm
        :initial-state="tagFormInitialState"
        :loading
        @submit="handleTagCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
