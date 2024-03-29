<template>
  <component
    v-if="hasNotes"
    :is="viewMap[view]"
    :notes="displayNotes"
    @delete="deleteNote"
  />
  <div v-else class="text-grey">No notes. Try to add your first one...</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useNotesStore } from 'src/modules/notes/stores/notes';

import NoteList from 'src/modules/notes/components/NoteList.vue';
import NoteGrid from 'src/modules/notes/components/NoteGrid.vue';

const $q = useQuasar();

const notesStore = useNotesStore();

const { displayNotes, view } = storeToRefs(notesStore);

const viewMap = {
  list: NoteList,
  grid: NoteGrid,
};

const hasNotes = computed(() => displayNotes.value.length > 0);

const deleteNote = (id: string) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this note?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      $q.loadingBar.start();

      await notesStore.deleteNote(id);

      $q.notify({ type: 'positive', message: 'Note deleted' });
    } catch (error) {
      $q.notify({ type: 'negative', message: (error as Error).message });
    } finally {
      $q.loadingBar.stop();
    }
  });
};
</script>
