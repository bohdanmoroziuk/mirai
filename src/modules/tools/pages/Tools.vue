<template>
  <div class="tools q-pa-md q-gutter-y-md">
    <div class="flex items-center">
      <q-btn
        color="primary"
        icon="add"
        label="Add tool"
      />
    </div>

    <div class="tool-list">
      <div class="row q-col-gutter-sm">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          v-for="tool of tools"
          :key="tool.id"
        >
          <tool-card :tool="tool" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useToolsStore } from 'src/modules/tools';

const toolsStore = useToolsStore();

const { tools } = storeToRefs(toolsStore);

const getTools = async () => {
  await toolsStore.getTools();
};

onMounted(getTools);
</script>
