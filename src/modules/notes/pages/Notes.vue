<template>
  <div class="notes-page q-pa-md">
    <Toolbox />
    <q-separator spaced="16px" />
    <component
      :is="viewMap[view]"
      :notes="filteredNotes"
      @delete="deleteNote"
    />
    <TopicDialog />
    <NoteDialog />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useNotesStore } from 'src/modules/notes/stores/notes';

import Toolbox from 'src/modules/notes/components/Toolbox.vue';
import TopicDialog from 'src/modules/notes/components/TopicDialog.vue';
import NoteDialog from 'src/modules/notes/components/NoteDialog.vue';
import NoteList from 'src/modules/notes/components/NoteList.vue';
import NoteGrid from 'src/modules/notes/components/NoteGrid.vue';

const $q = useQuasar();

const notesStore = useNotesStore();

const { filteredNotes, view } = storeToRefs(notesStore);

const viewMap = {
  list: NoteList,
  grid: NoteGrid,
};

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

const deleteNote = async (id: string) => {
  try {
    $q.loadingBar.start();

    await notesStore.deleteNote(id);

    $q.notify({ type: 'positive', message: 'Note deleted' });
  } catch (error) {
    $q.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    $q.loadingBar.stop();
  }
};

onMounted(getNotes);
</script>
