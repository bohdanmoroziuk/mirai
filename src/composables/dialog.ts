import { useToggle } from '@vueuse/core';

export const useDialog = (isInitiallyOpen = false) => {
  const [dialog, toggle] = useToggle(isInitiallyOpen);

  const open = () => {
    toggle(true);
  };

  const close = () => {
    toggle(false);
  };

  return {
    dialog,
    toggle,
    open,
    close,
  };
};
