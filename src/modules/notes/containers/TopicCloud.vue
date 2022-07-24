<template>
  <div class="q-gutter-sm">
    <q-chip
      :color="getRandomColor()"
      text-color="white"
      icon="topic"
      removable
      clickable
      v-for="topic of topics"
      :key="topic.id"
    >
      {{ topic.name }}
    </q-chip>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useNotesStore } from 'src/modules/notes/stores/notes';

const notesStore = useNotesStore();

const { topics } = storeToRefs(notesStore);

const getRandomColor = () => {
  const colors = ['primary', 'secondary', 'dark', 'info', 'positive', 'negative'];

  return colors[Math.floor(Math.random() * colors.length)];
};
</script>
