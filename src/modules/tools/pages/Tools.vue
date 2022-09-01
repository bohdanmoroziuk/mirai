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
          <tool-card
            :tool="tool"
            @delete="deleteTool"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

import { useToolsStore, ToolCard, ToolId } from 'src/modules/tools';

const $q = useQuasar();

const toolsStore = useToolsStore();

const { tools } = storeToRefs(toolsStore);

const getTools = async () => {
  await toolsStore.getTools();
};

const deleteTool = async (id: ToolId) => {
  try {
    await toolsStore.deleteTool(id);

    $q.notify({
      type: 'positive',
      message: 'Tool successfully deleted',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: (error as Error).message,
    });
  }
};

onMounted(getTools);
</script>
