import { defineStore } from 'pinia';

export interface State {
  isTopicDialogShown: boolean;
  isNoteDialogShown: boolean;
}

export const useDialogsStore = defineStore('dialogs', {
  persist: true,
  state(): State {
    return {
      isTopicDialogShown: false,
      isNoteDialogShown: false,
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
    showNoteDialog() {
      this.isNoteDialogShown = true;
    },
    hideNoteDialog() {
      this.isNoteDialogShown = false;
    },
    toggleNoteDialog() {
      this.isNoteDialogShown = !this.isNoteDialogShown;
    },
  },
});
