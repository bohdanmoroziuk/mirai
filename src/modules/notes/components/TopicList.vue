<template>
  <div class="topic-list">
    <q-chip
      class="topic-list-item"
      v-for="topic of topics"
      :key="topic.id"
      color="primary"
      text-color="white"
      removable
      @remove="removeTopic(topic.id)"
    >
      {{ topic.name }}
    </q-chip>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { Topic } from 'src/modules/notes/stores/topics';

interface Props {
  topics: Topic[];
}

interface Emits {
  (event: 'remove', payload: string): void;
}

defineProps<Props>();

const emits = defineEmits<Emits>();

const removeTopic = (id: string) => {
  emits('remove', id);
};
</script>
