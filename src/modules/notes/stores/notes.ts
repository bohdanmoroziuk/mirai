import { uid } from 'quasar';
import { defineStore } from 'pinia';

export type View = 'list' | 'grid';

export interface Note {
  id: string;
  name: string;
  text: string;
  createdAt: number;
}

export interface State {
  notes: Note[];
  searchTerm: string;
  view: View;
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
      searchTerm: '',
      view: 'grid',
    };
  },
  getters: {
    filteredNotes(state: State): Note[] {
      const needle = state.searchTerm.toLowerCase();

      if (this.notes.length === 0) return this.notes;
      if (needle === '') return this.notes;

      return this.notes.filter((note) => {
        if (note.name.toLowerCase().includes(needle)) return true;
        if (note.text.toLowerCase().includes(needle)) return true;
        return false;
      });
    },
  },
  actions: {
    addNote(name: string, text: string) {
      const note = createNote(name, text);

      this.notes = [...this.notes, note];
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    setSearchTerm(searchTerm: string) {
      this.searchTerm = searchTerm;
    },
    setView(view: View) {
      this.view = view;
    },
  },
});
