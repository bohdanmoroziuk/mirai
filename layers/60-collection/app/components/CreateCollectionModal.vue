<script setup lang="ts">
import { useCreateCollectionWorkflow } from '../workflows/create-collection.workflow'
import type { CollectionFormState } from '../types/collection'

const {
  collectionFormInitialState,
  isCreating,
  createCollection,
} = useCreateCollectionWorkflow()

const [isOpen, toggle] = useToggle()

const open = () => {
  toggle(true)
}

const close = () => {
  toggle(false)
}

const handleCollectionCreate = async (state: CollectionFormState) => {
  const success = await createCollection(state)

  if (success) {
    close()
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
      <CollectionForm
        :submitting="isCreating"
        :initial-state="collectionFormInitialState"
        @submit="handleCollectionCreate"
        @cancel="close"
      />
    </template>
  </UModal>
</template>
