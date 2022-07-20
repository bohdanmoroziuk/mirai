import { defineStore } from 'pinia';

export interface State {
  isTopicDialogShown: boolean;
}

export const useDialogsStore = defineStore('dialogs', {
  state(): State {
    return {
      isTopicDialogShown: false,
    };
  },
  actions: {
    showTopicDialog() {
      this.isTopicDialogShown = true;
    },
    hideTopicDialog() {
      this.isTopicDialogShown = false;
    },
    toggleTopicDialog() {
      this.isTopicDialogShown = !this.isTopicDialogShown;
    },
  },
});
