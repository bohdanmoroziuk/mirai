<script setup lang="ts">
import { useCreateCollectionWorkflow } from '../workflows/create-collection.workflow'
import { getCollectionFormInitialState } from '../mappers/collection.mapper'
import { toCreateCollectionInput } from '../mappers/collection-input.mapper'
import type { CollectionFormState } from '../types/collection'

const collectionFormInitialState = getCollectionFormInitialState()
const { isCreating, createCollection } = useCreateCollectionWorkflow()
const { isOpen, open, close } = useModalState()

const handleCollectionCreate = async (state: CollectionFormState) => {
  const success = await createCollection(toCreateCollectionInput(state))

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
