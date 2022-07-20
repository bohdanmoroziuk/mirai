<template>
  <div class="tasks-index">
    <router-view />
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">New task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model.trim="name" placeholder="Name" autofocus />
          <q-input v-model.trim="description" placeholder="Description" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup color="red" />
          <q-btn flat label="Add" v-close-popup :disable="cannotAddTask" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn fab icon="add" color="primary" dense />
    </q-page-sticky>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useModalStore } from 'src/modules/tasks/stores/modal';

const modalStore = useModalStore();

const { isOpen } = storeToRefs(modalStore);

const dialog = computed({
  get() {
    return isOpen.value;
  },
  set() {
    modalStore.toggle();
  },
});

const name = ref('');
const description = ref('');

const cannotAddTask = computed(() => name.value === '');
</script>
