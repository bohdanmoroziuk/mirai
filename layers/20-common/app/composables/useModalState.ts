export const useModalState = (initialValue = false) => {
  const [isOpen, toggle] = useToggle(initialValue)

  const open = () => {
    toggle(true)
  }

  const close = () => {
    toggle(false)
  }

  return {
    isOpen,
    open,
    close,
  }
}
