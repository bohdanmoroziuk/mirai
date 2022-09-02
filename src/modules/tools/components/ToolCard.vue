<template>
  <q-card
    class="cursor-pointer"
    flat
    bordered
    @click.stop="handleClick"
  >
    <q-card-section class="q-pa-xs q-pl-md">
      <div class="flex items-center no-wrap q-col-gutter-xs">
        <div class="text-caption text-primary">
          {{ tool.name }}
        </div>
        <q-space />
        <q-btn color="red" round flat icon="delete" @click.stop="handleDelete" />
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

const handleClick = () => {
  openExternalUrl(props.tool.url);
};

const handleDelete = () => {
  emits('delete', props.tool.id);
};
</script>
