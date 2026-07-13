<script setup lang="ts">
import { toCreateTagInput } from '../mappers/tag-input.mapper'
import { getTagFormInitialState } from '../mappers/tag.mapper'
import type { TagFormState } from '../types/tag'
import { useCreateTagWorkflow } from '../workflows/create-tag.workflow'

const tagFormInitialState = getTagFormInitialState()
const { isCreating, createTag } = useCreateTagWorkflow()
const [isOpen, toggle] = useToggle()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const handleTagCreate = async (state: TagFormState) => {
  const success = await createTag(toCreateTagInput(state))

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
        :submitting="isCreating"
        @submit="handleTagCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
