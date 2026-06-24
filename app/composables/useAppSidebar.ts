export const useAppSidebar = () => {
  const open = useLocalStorage('app-sidebar-open', true)

  const toggle = () => {
    open.value = !open.value
  }

  return {
    open,
    toggle,
  }
}
