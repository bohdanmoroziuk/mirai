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
import { Note, Topic } from 'src/modules/notes/types';

export type View = 'list' | 'grid';

export type SortKey = 'name' | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface State {
  notes: Note[];
  topics: Topic[];
  searchTerm: string;
  view: View;
  isDialogOpen: boolean;
  isTopicDialogOpen: boolean;
  sortKey: SortKey;
  sortDirection: SortDirection;
}

const getTimestamp = () => new Date().getTime();

const getRandomColor = () => {
  const colors = ['primary', 'secondary', 'dark', 'info', 'positive', 'negative'];

  return colors[Math.floor(Math.random() * colors.length)];
};

export const createNote = (name: string, text: string): Note => ({
  name,
  text,
  id: uid(),
  createdAt: getTimestamp(),
});

export const createTopic = (name: string): Topic => ({
  name,
  id: uid(),
  color: getRandomColor(),
  createdAt: getTimestamp(),
});

export const useNotesStore = defineStore('notes', {
  state(): State {
    return {
      notes: [],
      topics: [],
      searchTerm: '',
      view: 'grid',
      isDialogOpen: false,
      isTopicDialogOpen: false,
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
    openTopicDialog() {
      this.isTopicDialogOpen = true;
    },
    closeTopicDialog() {
      this.isTopicDialogOpen = false;
    },
    toggleTopicDialog() {
      this.isTopicDialogOpen = !this.isTopicDialogOpen;
    },
    async getTopics() {
      const snapshot = await getDocs(collection(firestore, 'topics'));

      this.topics = snapshot.docs.map((doc) => doc.data() as Topic);
    },
    async addTopic(name: string) {
      const isAlreadyExist = this.topics.find((topic) => topic.name === name);

      if (isAlreadyExist) throw new Error('A topic with that name already exists');

      const topic = createTopic(name);

      await setDoc(doc(firestore, 'topics', topic.id), topic);

      this.topics = [topic, ...this.topics];
    },
    async deleteTopic(id: string) {
      await deleteDoc(doc(firestore, 'topics', id));

      this.topics = this.topics.filter((topic) => topic.id !== id);
    },
  },
});
