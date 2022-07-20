import { defineStore } from 'pinia';

export interface State {
  isOpen: boolean;
}

export const useModalStore = defineStore('modal', {
  state(): State {
    return {
      isOpen: false,
    };
  },
  actions: {
    show() {
      this.isOpen = true;
    },
    hide() {
      this.isOpen = false;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
