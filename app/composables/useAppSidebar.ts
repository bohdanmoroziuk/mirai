export const useAppSidebar = () => {
  const open = useState('app-sidebar-open', () => true)

  const toggle = () => {
    open.value = !open.value
  }

  return {
    open,
    toggle,
  }
}
