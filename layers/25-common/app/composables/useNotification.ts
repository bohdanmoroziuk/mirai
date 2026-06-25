import type { ToastProps } from '@nuxt/ui'

export type NotificationType
  = | 'success'
    | 'info'
    | 'warning'
    | 'error'

export type NotificationOptions = Omit<ToastProps, 'color'>

const notificationOptions = {
  success: {
    color: 'success',
  },
  info: {
    color: 'primary',
  },
  warning: {
    color: 'warning',
  },
  error: {
    color: 'error',
  },
} satisfies Record<NotificationType, Partial<ToastProps>>

export const useNotification = () => {
  const toast = useToast()

  const success = (options: NotificationOptions) => {
    return toast.add({
      ...notificationOptions.success,
      ...options,
    })
  }

  const info = (options: NotificationOptions) => {
    return toast.add({
      ...notificationOptions.info,
      ...options,
    })
  }

  const warning = (options: NotificationOptions) => {
    return toast.add({
      ...notificationOptions.warning,
      ...options,
    })
  }

  const error = (options: NotificationOptions) => {
    return toast.add({
      ...notificationOptions.error,
      ...options,
    })
  }

  return {
    success,
    info,
    warning,
    error,
  }
}
