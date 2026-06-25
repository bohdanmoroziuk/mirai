<script setup lang="ts">
import type { ButtonProps, ModalProps } from '@nuxt/ui'

type ConfirmDialogProps = Pick<
  ModalProps,
  | 'title'
  | 'description'
  | 'dismissible'
> & {
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: ButtonProps['color']
  cancelColor?: ButtonProps['color']
  onConfirm?: () => Promise<void> | void
  onCancel?: () => Promise<void> | void
  onError?: (error: unknown) => Promise<void> | void
}

const props = withDefaults(defineProps<ConfirmDialogProps>(), {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  confirmColor: 'error',
  cancelColor: 'neutral',
  dismissible: true,
})

const emit = defineEmits<{
  close: [confirmed: boolean]
}>()

const loading = ref(false)

const confirm = async () => {
  try {
    loading.value = true

    await props.onConfirm?.()

    emit('close', true)
  }
  catch (error) {
    await props.onError?.(error)

    loading.value = false
  }
  finally {
    loading.value = false
  }
}

const cancel = async () => {
  if (loading.value) return

  await props.onCancel?.()

  emit('close', false)
}
</script>

<template>
  <UModal
    :title
    :description
    :dismissible="dismissible && !loading"
    :close="{ onClick: cancel }"
  >
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton
          :label="cancelLabel"
          :color="cancelColor"
          variant="outline"
          :disabled="loading"
          @click="cancel"
        />

        <UButton
          :label="confirmLabel"
          :color="confirmColor"
          :loading="loading"
          @click="confirm"
        />
      </div>
    </template>
  </UModal>
</template>
