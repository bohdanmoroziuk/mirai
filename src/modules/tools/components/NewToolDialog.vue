<template>
  <q-btn
    color="primary"
    icon="add"
    label="Add tool"
    @click="open"
  />
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Tool</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-y-md">
        <q-input
          dense
          autofocus
          label="Name"
          v-model.trim="body.name"
        />
        <q-input
          dense
          label="Url"
          v-model.trim="body.url"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup @click="cancel" color="red" />
        <q-btn flat label="Add" v-close-popup @click="add" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

import { useDialog } from 'src/composables';
import { ToolBody } from 'src/modules/tools';

interface Emits {
  (event: 'add', payload: ToolBody): void;
}

const emits = defineEmits<Emits>();

const body = ref<ToolBody>({
  name: '',
  url: '',
});

const { dialog, open, close } = useDialog();

const reset = () => {
  body.value = {
    name: '',
    url: '',
  };
};

const add = () => {
  emits('add', body.value);
  reset();
  close();
};

const cancel = () => {
  reset();
  close();
};
</script>
