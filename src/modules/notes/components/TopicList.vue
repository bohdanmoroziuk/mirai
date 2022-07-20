<template>
  <div class="topic-list">
    <q-chip
      class="topic-list-item"
      v-for="topic of topics"
      :key="topic.id"
      color="primary"
      text-color="white"
    >
      {{ topic.name }}
    </q-chip>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { Topic } from 'src/modules/notes/stores/topics';

interface Props {
  topics: Topic[];
}

defineProps<Props>();
</script>
