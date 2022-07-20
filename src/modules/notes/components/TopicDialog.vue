<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Enter a topic name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model.trim="name" autofocus placeholder="Name" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="hideDialog" />
        <q-btn flat label="Add" :disable="cannotAddTopic" @click="addTopic" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useDialogsStore } from 'src/modules/notes/stores/dialogs';
import { useTopicsStore } from 'src/modules/notes/stores/topics';

const $q = useQuasar();

const dialogsStore = useDialogsStore();

const topicsStore = useTopicsStore();

const { isTopicDialogShown } = storeToRefs(dialogsStore);

const dialog = computed({
  get() {
    return isTopicDialogShown.value;
  },
  set() {
    dialogsStore.toggleTopicDialog();
  },
});

const name = ref('');

const cannotAddTopic = computed(() => name.value === '');

const hideDialog = () => {
  name.value = '';
  dialogsStore.hideTopicDialog();
};

const addTopic = () => {
  try {
    topicsStore.addTopic(name.value);

    $q.notify({ type: 'positive', message: 'New topic added' });
  } catch (error) {
    $q.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    hideDialog();
  }
};
</script>
