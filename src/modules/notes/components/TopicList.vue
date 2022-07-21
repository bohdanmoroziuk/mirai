<template>
  <div class="topic-list" v-if="hasTopics">
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
  <div v-else class="text-grey">No topics. Try to add your first one...</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

import { Topic } from 'src/modules/notes/stores/topics';

interface Props {
  topics: Topic[];
}

interface Emits {
  (event: 'remove', payload: string): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const hasTopics = computed(() => props.topics.length > 0);

const removeTopic = (id: string) => {
  emits('remove', id);
};
</script>
