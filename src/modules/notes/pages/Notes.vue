<template>
  <div class="notes-page q-pa-md">
    <Toolbox />
    <q-separator spaced="16px" />
    <NoteList :notes="filteredNotes" @delete="deleteNote" />
    <TopicDialog />
    <NoteDialog />
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useNotesStore } from 'src/modules/notes/stores/notes';

import Toolbox from 'src/modules/notes/components/Toolbox.vue';
import TopicDialog from 'src/modules/notes/components/TopicDialog.vue';
import NoteDialog from 'src/modules/notes/components/NoteDialog.vue';
import NoteList from 'src/modules/notes/components/NoteList.vue';

const $q = useQuasar();

const notesStore = useNotesStore();

const { filteredNotes } = storeToRefs(notesStore);

const deleteNote = (id: string) => {
  notesStore.deleteNote(id);

  $q.notify({ type: 'positive', message: 'Note deleted' });
};
</script>
