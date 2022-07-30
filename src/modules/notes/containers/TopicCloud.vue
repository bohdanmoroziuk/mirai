<template>
  <div
    v-if="hasTopics"
    class="topic-cloud"
  >
    <TopicList
      :topics="topics"
      @select="selectTopic"
      @delete="deleteTopic"
    />
  </div>
  <div
    v-else
    class="text-grey"
  >
    No topics. Try to add your first one...
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useNotesStore } from 'src/modules/notes/stores/notes';
import TopicList from 'src/modules/notes/components/TopicList.vue';

const $q = useQuasar();

const router = useRouter();

const notesStore = useNotesStore();

const { topics } = storeToRefs(notesStore);

const hasTopics = computed(() => topics.value.length > 0);

const selectTopic = async (id: string | null) => {
  notesStore.selectTopic(id);

  if (id) {
    await router.push({ name: 'notes', query: { topic: id } });
  } else {
    await router.push(router.currentRoute.value.path);
  }
};

const deleteTopic = (id: string) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this topic?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      $q.loadingBar.start();

      await notesStore.deleteTopic(id);

      $q.notify({ type: 'positive', message: 'Topic deleted' });
    } catch (error) {
      $q.notify({ type: 'negative', message: (error as Error).message });
    } finally {
      $q.loadingBar.stop();
    }
  });
};
</script>
