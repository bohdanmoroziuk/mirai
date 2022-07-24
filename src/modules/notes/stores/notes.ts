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

export type SortKey = 'name' | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface State {
  notes: Note[];
  searchTerm: string;
  view: View;
  isDialogOpen: boolean;
  sortKey: SortKey;
  sortDirection: SortDirection;
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
      sortKey: 'name',
      sortDirection: 'asc',
    };
  },
  getters: {
    sortedNotes(state: State): Note[] {
      const { notes, sortKey, sortDirection } = state;

      return notes.slice().sort((a, b) => {
        if (a[sortKey] > b[sortKey]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (b[sortKey] > a[sortKey]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    },
    filteredNotes(state: State): Note[] {
      const needle = state.searchTerm.toLowerCase();

      const notes = this.sortedNotes;

      if (notes.length === 0) return notes;
      if (needle === '') return notes;

      return notes.filter((note) => {
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
    setSortKey(sortKey: SortKey) {
      this.sortKey = sortKey;
    },
    setSortDirection(sortDirection: SortDirection) {
      this.sortDirection = sortDirection;
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
