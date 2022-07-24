<template>
  <q-list>
    <template
      v-for="note of notes"
      :key="note.id"
    >
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ note.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label caption>
            {{ note.text }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="q-gutter-x-sm">
            <q-btn
              flat
              dense
              round
              icon="delete"
              color="negative"
              @click="deleteNote(note.id)"
            />
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { Note } from 'src/modules/notes/types';

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

</style>
