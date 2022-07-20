<template>
  <div class="topic-cloud row items-center q-gutter-x-sm">
    <TopicList v-if="hasTopics" :topics="topics" />
    <div v-else>Add your first topic...</div>
    <q-btn dense flat round color="primary" icon="add" @click="showTopicDialog" />
  </div>
  <TopicDialog />
  <q-separator spaced />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import TopicList from 'src/modules/notes/components/TopicList.vue';
import TopicDialog from 'src/modules/notes/components/TopicDialog.vue';

import { useDialogsStore } from 'src/modules/notes/stores/dialogs';
import { useTopicsStore } from 'src/modules/notes/stores/topics';

const dialogsStore = useDialogsStore();

const topicsStore = useTopicsStore();

const { topics, hasTopics } = storeToRefs(topicsStore);

const showTopicDialog = () => {
  dialogsStore.showTopicDialog();
};
</script>
