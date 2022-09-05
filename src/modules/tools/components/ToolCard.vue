<template>
  <q-card
    class="column full-height cursor-pointer"
    flat
    bordered
    @click.stop="handleClick"
  >
    <q-card-section class="q-px-xs q-py-md">
      <div class="image-container flex items-center justify-center">
        <img
          class="image"
          :src="tool.image || fallbackImage"
          :alt="tool.name"
        />
      </div>
    </q-card-section>

    <q-card-section class="q-pa-xs q-pl-md q-mt-auto">
      <div class="flex items-center no-wrap">
        <div class="column">
          <span class="text-primary">
            {{ tool.name }}
          </span>
          <span class="text-caption text-secondary" v-if="tool.group">
            {{ tool.group.name }}
          </span>
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
.image-container {
  height: 64px;
}

.image {
  max-width: 64px;
  height: auto;
}
</style>
