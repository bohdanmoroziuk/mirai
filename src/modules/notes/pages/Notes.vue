<template>
  <div class="notes-page q-pa-md">
    <div class="row items-center q-gutter-x-sm">
      <q-btn
        color="secondary"
        icon="add"
        label="Add topic"
        @click="showTopicDialog"
      />
      <q-btn
        color="primary"
        icon="add"
        label="Add note"
        @click="showNoteDialog"
      />
    </div>
    <q-separator spaced="16px" />
    <TopicList :topics="topics" @remove="removeTopic" />
    <q-separator spaced="16px" />
    <NoteList :notes="notes" @delete="deleteNote" />
    <TopicDialog />
    <NoteDialog />
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useDialogsStore } from 'src/modules/notes/stores/dialogs';
import { useNotesStore } from 'src/modules/notes/stores/notes';
import { useTopicsStore } from 'src/modules/notes/stores/topics';

import TopicList from 'src/modules/notes/components/TopicList.vue';
import TopicDialog from 'src/modules/notes/components/TopicDialog.vue';
import NoteDialog from 'src/modules/notes/components/NoteDialog.vue';
import NoteList from 'src/modules/notes/components/NoteList.vue';

const $q = useQuasar();

const topicsStore = useTopicsStore();

const notesStore = useNotesStore();

const { topics } = storeToRefs(topicsStore);

const { notes } = storeToRefs(notesStore);

const dialogsStore = useDialogsStore();

const showTopicDialog = () => {
  dialogsStore.showTopicDialog();
};

const showNoteDialog = () => {
  dialogsStore.showNoteDialog();
};

const removeTopic = (id: string) => {
  topicsStore.deleteTopic(id);

  $q.notify({ type: 'positive', message: 'Topic deleted' });
};

const deleteNote = (id: string) => {
  notesStore.deleteNote(id);

  $q.notify({ type: 'positive', message: 'Note deleted' });
};
</script>
