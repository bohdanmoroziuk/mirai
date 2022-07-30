<template>
  <div class="topic-list q-gutter-sm">
    <q-chip
      color="black"
      text-color="white"
      icon="topic"
      clickable
      @click="selectTopic(null)"
    >
      All
    </q-chip>
    <q-chip
      v-for="topic of topics"
      :key="topic.id"
      :color="topic.color"
      text-color="white"
      icon="topic"
      removable
      clickable
      @click="selectTopic(topic.id)"
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
  (event: 'select', payload: string | null): void;
  (event: 'delete', payload: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();

const selectTopic = (id: string | null) => {
  emits('select', id);
};

const deleteTopic = (id: string) => {
  emits('delete', id);
};
</script>
