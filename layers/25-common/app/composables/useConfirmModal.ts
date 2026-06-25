import type { ButtonProps, ModalProps } from '@nuxt/ui'
import { LazyUiConfirmModal } from '#components'

export type ConfirmModalOptions = Pick<
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

export const useConfirmModal = () => {
  const overlay = useOverlay()

  const confirm = async (options: ConfirmModalOptions) => {
    const modal = overlay.create(LazyUiConfirmModal)
    const instance = modal.open(options)
    const confirmed = await instance.result

    return confirmed
  }

  return {
    confirm,
  }
}
