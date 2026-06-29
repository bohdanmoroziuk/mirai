<script setup lang="ts">
import { UiConfirmModal } from '#components'

definePageMeta({
  devOnly: true,
  layout: false,
})

const overlay = useOverlay()

function openDefaultModal() {
  const modal = overlay.create(UiConfirmModal)

  modal.open({
    title: 'Delete bookmark?',
    description: 'This action cannot be undone.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    onConfirm() {
      modal.close()
    },
    onCancel() {
      modal.close()
    },
  })
}

function openNonDestructiveModal() {
  const modal = overlay.create(UiConfirmModal)

  modal.open({
    title: 'Leave page?',
    description: 'You have unsaved changes. They will be lost if you leave now.',
    dismissible: false,
    confirmLabel: 'Leave',
    cancelLabel: 'Stay',
    onConfirm() {
      modal.close()
    },
    onCancel() {
      modal.close()
    },
  })
}
</script>

<template>
  <UContainer class="space-y-8 py-8">
    <div class="space-y-2">
      <UButton
        to="/dev/components"
        variant="ghost"
        icon="i-lucide-arrow-left"
      >
        Components
      </UButton>

      <h1 class="text-2xl font-semibold">
        UiConfirmModal
      </h1>

      <p class="text-muted">
        Shared modal for confirming important user actions.
      </p>
    </div>

    <UCard>
      <template #header>
        Default confirmation
      </template>

      <div class="space-y-4">
        <p class="text-sm text-muted">
          Basic destructive confirmation modal.
        </p>

        <UButton
          color="error"
          @click="openDefaultModal"
        >
          Open modal
        </UButton>
      </div>
    </UCard>

    <UCard>
      <template #header>
        Non-destructive confirmation
      </template>

      <div class="space-y-4">
        <p class="text-sm text-muted">
          Confirmation modal for leaving a page with unsaved changes.
        </p>

        <UButton
          variant="soft"
          @click="openNonDestructiveModal"
        >
          Open modal
        </UButton>
      </div>
    </UCard>
  </UContainer>
</template>
