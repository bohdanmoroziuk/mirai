<template>
  <q-card
    class="cursor-pointer"
    flat
    bordered
    @click.stop="handleClick"
  >
    <q-card-section class="q-pa-none q-pl-md">
      <div class="row items-center no-wrap q-col-gutter-xs">
        <div class="col">
          <div class="text-caption">
            {{ tool.name }}
          </div>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert" @click.stop="">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable @click="handleUpdate">
                  <q-item-section>Update</q-item-section>
                </q-item>
                <q-item clickable @click="handleDelete">
                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
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
  (event: 'update', payload: ToolId): void;
  (event: 'delete', payload: ToolId): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const handleClick = () => {
  openExternalUrl(props.tool.url);
};

const handleUpdate = () => {
  emits('update', props.tool.id);
};

const handleDelete = () => {
  emits('delete', props.tool.id);
};
</script>
