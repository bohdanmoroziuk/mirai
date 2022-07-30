<template>
  <div class="topic-list q-gutter-sm">
    <q-chip
      v-for="topic of topics"
      :key="topic.id"
      :color="topic.color"
      text-color="white"
      icon="topic"
      removable
      clickable
      @remove="deleteTopic(topic.id)"
    >
      {{ topic.name }}
    </q-chip>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { Topic } from 'src/modules/notes/types';

interface Props {
  topics: Topic[];
}

interface Emits {
  (event: 'delete', payload: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();

const deleteTopic = (id: string) => {
  emits('delete', id);
};
</script>
