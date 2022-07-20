<template>
  <div class="topic-cloud row items-center q-gutter-x-sm">
    <TopicList
      v-if="hasTopics"
      :topics="topics"
      @remove="removeTopic"
    />
    <div v-else>Add your first topic...</div>
    <q-btn
      dense
      flat
      round
      color="primary"
      icon="add"
      @click="showTopicDialog"
    />
  </div>
  <TopicDialog />
  <q-separator spaced />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import TopicList from 'src/modules/notes/components/TopicList.vue';
import TopicDialog from 'src/modules/notes/components/TopicDialog.vue';

import { useDialogsStore } from 'src/modules/notes/stores/dialogs';
import { useTopicsStore } from 'src/modules/notes/stores/topics';

const $q = useQuasar();

const dialogsStore = useDialogsStore();

const topicsStore = useTopicsStore();

const { topics, hasTopics } = storeToRefs(topicsStore);

const showTopicDialog = () => {
  dialogsStore.showTopicDialog();
};

const removeTopic = (id: string) => {
  topicsStore.deleteTopic(id);

  $q.notify({ type: 'positive', message: 'Topic deleted' });
};
</script>
