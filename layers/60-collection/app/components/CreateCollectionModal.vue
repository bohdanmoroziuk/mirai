<script setup lang="ts">
import { useCreateCollectionMutation } from '../queries/collection.queries'
import type { CreateCollectionInput } from '../types/collection'

const notification = useNotification()
const [isOpen, toggle] = useToggle()
const { isPending, createCollection } = useCreateCollectionMutation()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const handleCollectionCreate = async (input: CreateCollectionInput) => {
  try {
    await createCollection(input)

    notification.success({
      title: 'Collection has been created',
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
    title="Create collection"
  >
    <template #default>
      <UButton
        label="Create collection"
        color="primary"
        variant="outline"
        @click="open"
      />
    </template>

    <template #body>
      <CreateCollectionForm
        :loading="isPending"
        @submit="handleCollectionCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
