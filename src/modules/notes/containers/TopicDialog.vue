<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6">Add topic</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-gutter-y-md">
          <q-input
            v-model.trim="name"
            placeholder="Name"
            clearable
            autofocus
            dense
          />
        </div>
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

import { useNotesStore } from 'src/modules/notes/stores/notes';

const $q = useQuasar();

const notesStore = useNotesStore();

const { isTopicDialogOpen } = storeToRefs(notesStore);

const dialog = computed({
  get() {
    return isTopicDialogOpen.value;
  },
  set() {
    notesStore.toggleTopicDialog();
  },
});

const name = ref('');

const cannotAddTopic = computed(() => name.value === '');

const hideDialog = () => {
  name.value = '';
  notesStore.closeTopicDialog();
};

const addTopic = async () => {
  try {
    $q.loadingBar.start();

    await notesStore.addTopic(name.value);

    $q.notify({ type: 'positive', message: 'New topic added' });
  } catch (error) {
    $q.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    hideDialog();
    $q.loadingBar.stop();
  }
};
</script>
