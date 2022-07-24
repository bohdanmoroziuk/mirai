import { uid } from 'quasar';
import { defineStore } from 'pinia';
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'firebase/firestore';

import { firestore } from 'src/firebase';
import { Note } from 'src/modules/notes/types';

export type View = 'list' | 'grid';

export interface State {
  notes: Note[];
  searchTerm: string;
  view: View;
  isDialogOpen: boolean;
}

export const createNote = (name: string, text: string): Note => ({
  id: uid(),
  name,
  text,
  createdAt: new Date().getTime(),
});

export const useNotesStore = defineStore('notes', {
  state(): State {
    return {
      notes: [],
      searchTerm: '',
      view: 'grid',
      isDialogOpen: false,
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
    async getNotes() {
      const snapshot = await getDocs(collection(firestore, 'notes'));

      this.notes = snapshot.docs.map((doc) => doc.data() as Note);
    },
    async addNote(name: string, text: string) {
      const note = createNote(name, text);

      await setDoc(doc(firestore, 'notes', note.id), note);

      this.notes = [note, ...this.notes];
    },
    async deleteNote(id: string) {
      await deleteDoc(doc(firestore, 'notes', id));

      this.notes = this.notes.filter((note) => note.id !== id);
    },
    setSearchTerm(searchTerm: string) {
      this.searchTerm = searchTerm;
    },
    setView(view: View) {
      this.view = view;
    },
    openDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    toggleDialog() {
      this.isDialogOpen = !this.isDialogOpen;
    },
  },
});
