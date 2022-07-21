<template>
  <div
    v-if="hasNotes"
    class="q-gutter-md"
    style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-auto-rows: max-content;"
  >
    <q-card
      class="card column"
      v-for="note of notes"
      :key="note.id"
      flat
      square
      bordered
    >
      <q-card-section>
        <div class="text-h6">{{ note.name }}</div>
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
  <div v-else class="text-grey">No notes. Try to add your first one...</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

import { Note } from 'src/modules/notes/stores/notes';

interface Props {
  notes: Note[];
}

interface Emits {
  (event: 'delete', payload: string): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const hasNotes = computed(() => props.notes.length > 0);

const deleteNote = (id: string) => {
  emits('delete', id);
};
</script>

<style scoped>

</style>
