<template>
  <q-btn
    color="primary"
    icon="add"
    label="Add group"
    @click="open"
  />
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Group</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-y-md">
        <q-input
          dense
          autofocus
          label="Name *"
          ref="nameInputRef"
          :rules="[required]"
          lazy-rules="ondemand"
          v-model.trim="name"
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

import { required } from 'src/rules';
import { useDialog } from 'src/composables';
import { GroupName } from 'src/modules/tools';

interface Emits {
  (event: 'add', payload: GroupName): void;
}

const emits = defineEmits<Emits>();

const name = ref<GroupName>('');

const nameInputRef = ref<QInput>();

const { dialog, open, close } = useDialog();

const reset = () => {
  name.value = '';

  nameInputRef.value?.resetValidation();
};

const add = () => {
  const hasError = nameInputRef.value?.validate() === false;

  if (hasError) return;

  emits('add', name.value);
  reset();
  close();
};

const cancel = () => {
  reset();
  close();
};
</script>
