<script setup lang="ts">
import { toCreateTagInput } from '../mappers/tag-input.mapper'
import { getTagFormInitialState } from '../mappers/tag.mapper'
import { useCreateTagMutation } from '../queries/tag.queries'
import type { TagFormState } from '../types/tag'

const notification = useNotification()
const [isOpen, toggle] = useToggle()
const { loading, createTag } = useCreateTagMutation()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const initialState = getTagFormInitialState()

const handleTagCreate = async (state: TagFormState) => {
  try {
    await createTag(toCreateTagInput(state))

    notification.success({
      title: 'Tag has been created',
    })

    close()
  }
  catch (error) {
    notification.error({
      title: 'Operation failed!',
      description: getErrorMessage(error),
    })
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
        :initial-state
        :loading
        @submit="handleTagCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
