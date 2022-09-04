<template>
  <q-card
    class="cursor-pointer"
    flat
    bordered
    @click.stop="handleClick"
  >
    <q-card-section class="q-px-xs q-py-md">
      <div class="flex justify-center">
        <img
          class="image"
          :src="tool.image || fallbackImage"
          :alt="tool.name"
        />
      </div>
    </q-card-section>

    <q-card-section class="q-pa-xs q-pl-md">
      <div class="flex items-center no-wrap">
        <div class="text-caption text-primary">
          {{ tool.name }}
        </div>
        <q-space />
        <q-btn
          color="red"
          round
          flat
          icon="delete"
          @click.stop="handleDelete"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

import { openExternalUrl } from 'src/utils';
import { Tool, ToolId } from 'src/modules/tools';

interface Props {
  tool: Tool;
}

interface Emits {
  (event: 'delete', payload: ToolId): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const fallbackImage = 'https://cdn.quasar.dev/logo-v2/svg/logo.svg';

const handleClick = () => {
  openExternalUrl(props.tool.url);
};

const handleDelete = () => {
  emits('delete', props.tool.id);
};
</script>

<style scoped>
.image {
  width: 64px;
  height: auto;
}
</style>
