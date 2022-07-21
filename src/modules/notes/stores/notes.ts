import { uid } from 'quasar';
import { defineStore } from 'pinia';

export interface Note {
  id: string;
  name: string;
  text: string;
  createdAt: number;
}

export interface State {
  notes: Note[];
}

export const createNote = (name: string, text: string): Note => ({
  id: uid(),
  name,
  text,
  createdAt: new Date().getTime(),
});

export const useNotesStore = defineStore('notes', {
  persist: true,
  state(): State {
    return {
      notes: [],
    };
  },
  actions: {
    addNote(name: string, text: string) {
      const note = createNote(name, text);

      this.notes = [...this.notes, note];
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
  },
});
