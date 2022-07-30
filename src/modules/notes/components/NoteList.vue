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
          <q-item-label class="text-grey">
            {{ formatDate(note.createdAt) }}
          </q-item-label>
          <div>
            <q-chip
              class="q-mx-none"
              :color="note.topic.color"
              text-color="white"
              icon="topic"
              size="sm"
              v-if="note.topic"
            >
              {{ note.topic.name }}
            </q-chip>
          </div>
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

import { DisplayNote } from 'src/modules/notes/types';
import { formatDate } from 'src/modules/notes/utils';

interface Props {
  notes: DisplayNote[];
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
