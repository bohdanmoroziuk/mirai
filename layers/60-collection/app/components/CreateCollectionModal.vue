<script setup lang="ts">
import { toCreateCollectionInput } from '../mappers/collection-input.mapper'
import { useCreateCollectionMutation } from '../queries/collection.queries'
import type { CollectionFormState } from '../types/collection'

const notification = useNotification()
const [isOpen, toggle] = useToggle()
const { loading, createCollection } = useCreateCollectionMutation()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const handleCollectionCreate = async (state: CollectionFormState) => {
  try {
    await createCollection(toCreateCollectionInput(state))

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
        :loading
        :initial-state="{ title: '' }"
        @submit="handleCollectionCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
