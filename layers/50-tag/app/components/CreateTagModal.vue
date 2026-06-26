<script setup lang="ts">
import { DEFAULT_TAG_COLOR } from '../../shared/constants/tag'
import { useCreateTagMutation } from '../queries/tag.queries'
import type { CreateTagInput } from '../types/tag'

const notification = useNotification()
const [isOpen, toggle] = useToggle()
const { loading, createTag } = useCreateTagMutation()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const initialState = {
  name: '',
  color: DEFAULT_TAG_COLOR,
}

const handleTagCreate = async (input: CreateTagInput) => {
  try {
    await createTag(input)

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
