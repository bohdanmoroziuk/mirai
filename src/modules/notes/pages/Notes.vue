<template>
  <div class="notes-page q-pa-md">
    <ToolBox />
    <q-separator spaced="16px" />
    <NotesView />
    <NoteDialog />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';

import { useNotesStore } from 'src/modules/notes/stores/notes';

import ToolBox from 'src/modules/notes/containers/ToolBox.vue';
import NotesView from 'src/modules/notes/containers/NotesView.vue';
import NoteDialog from 'src/modules/notes/containers/NoteDialog.vue';

const $q = useQuasar();

const notesStore = useNotesStore();

const getNotes = async () => {
  try {
    $q.loadingBar.start();

    await notesStore.getNotes();
  } catch (error) {
    $q.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    $q.loadingBar.stop();
  }
};

onMounted(getNotes);
</script>
