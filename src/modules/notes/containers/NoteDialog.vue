<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6">Add note</div>
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
          <q-input
            v-model.trim="text"
            placeholder="Text"
            clearable
            dense
          />
          <q-select
            v-model="topic"
            :options="topicOptions"
            label="Topic"
            clearable
            map-options
            emit-value
            dense
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="hideDialog" />
        <q-btn flat label="Add" :disable="cannotAddNote" @click="addNote" />
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

const { isDialogOpen, topics } = storeToRefs(notesStore);

const name = ref('');

const text = ref('');

const topic = ref<string | null>(null);

const topicOptions = computed(() => topics.value.map((topic) => ({
  value: topic.id,
  label: topic.name,
})));

const dialog = computed({
  get() {
    return isDialogOpen.value;
  },
  set() {
    notesStore.toggleDialog();
  },
});

const cannotAddNote = computed(() => name.value === '');

const hideDialog = () => {
  name.value = '';
  text.value = '';
  topic.value = null;
  notesStore.closeDialog();
};

const addNote = async () => {
  try {
    $q.loadingBar.start();

    await notesStore.addNote(name.value, text.value, topic.value);

    $q.notify({ type: 'positive', message: 'New note added' });
  } catch (error) {
    $q.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    hideDialog();
    $q.loadingBar.stop();
  }
};
</script>
