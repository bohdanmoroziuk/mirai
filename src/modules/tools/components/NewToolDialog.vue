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
          label="Name *"
          ref="nameInputRef"
          :rules="[required]"
          lazy-rules="ondemand"
          v-model.trim="body.name"
        />
        <q-input
          dense
          label="Url *"
          ref="urlInputRef"
          :rules="[required, url]"
          lazy-rules="ondemand"
          v-model.trim="body.url"
        />
        <q-input
          dense
          label="Image"
          v-model.trim="body.image"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="cancel" color="red" />
        <q-btn flat label="Add" @click="add" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { QInput } from 'quasar';

import { required, url } from 'src/rules';
import { useDialog } from 'src/composables';
import { ToolBody } from 'src/modules/tools';

interface Emits {
  (event: 'add', payload: ToolBody): void;
}

const emits = defineEmits<Emits>();

const body = ref<ToolBody>({
  name: '',
  url: '',
  image: '',
});

const nameInputRef = ref<QInput>();

const urlInputRef = ref<QInput>();

const { dialog, open, close } = useDialog();

const reset = () => {
  body.value = {
    name: '',
    url: '',
    image: '',
  };

  nameInputRef.value?.resetValidation();
  urlInputRef.value?.resetValidation();
};

const add = () => {
  const isNameValid = nameInputRef.value?.validate();
  const isUrlValid = urlInputRef.value?.validate();

  const hasError = !isNameValid || !isUrlValid;

  if (hasError) return;

  emits('add', body.value);
  reset();
  close();
};

const cancel = () => {
  reset();
  close();
};
</script>
