<template>
  <div class="note-grid q-gutter-md">
    <q-card
      class="card column"
      v-for="note of notes"
      :key="note.id"
      flat
      square
      bordered
    >
      <q-card-section>
        <div>{{ note.name }}</div>
        <div class="text-grey">{{ formatDate(note.createdAt) }}</div>
      </q-card-section>

      <q-card-section>
        {{ note.text }}
      </q-card-section>

      <q-separator dark />

      <q-card-actions class="q-mt-auto">
        <q-btn color="negative" flat @click="deleteNote(note.id)">Delete</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { Note } from 'src/modules/notes/types';
import { formatDate } from 'src/modules/notes/utils';

interface Props {
  notes: Note[];
}

interface Emits {
  (event: 'delete', payload: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();

const deleteNote = (id: string) => {
  emits('delete', id);
};
</script>

<style scoped>
.note-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
