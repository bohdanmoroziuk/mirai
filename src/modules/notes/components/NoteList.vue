<template>
  <div
    v-if="hasNotes"
    class="q-gutter-md"
    style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-auto-rows: max-content;">
    <q-card
      class="card"
      v-for="note of notes"
      :key="note.id"
    >
      <q-card-section>
        <div class="text-h6">{{ note.name }}</div>
      </q-card-section>

      <q-card-section>
        {{ note.text }}
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn color="negative" flat>Delete</q-btn>
      </q-card-actions>
    </q-card>
  </div>
  <div v-else class="text-grey">No notes. Try to add your first one...</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

import { Note } from 'src/modules/notes/stores/notes';

interface Props {
  notes: Note[];
}

const props = defineProps<Props>();

const hasNotes = computed(() => props.notes.length > 0);
</script>

<style scoped>

</style>
