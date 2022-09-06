<template>
  <div class="tools q-pa-md q-gutter-y-md">
    <div class="flex items-center justify-between q-gutter-x-md">
      <div class="flex items-center q-gutter-x-sm">
        <new-tool-dialog :groups="groups" @add="addTool" />
        <new-group-dialog @add="addGroup" />
      </div>
      <div>
        <tool-search-form />
      </div>
    </div>

    <div
      v-for="(items, group) in tools"
      :key="group"
    >
      <div class="flex items-center no-wrap">
        <q-chip color="primary" text-color="white" :ripple="false">
          {{ group }}
        </q-chip>
        <q-separator style="flex: 1;" horizontal spaced="lg" inset />
        <div class="actions">
          <q-btn
            color="red"
            round
            flat
            icon="delete"
          />
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          v-for="tool of items"
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
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

import groupBy from 'lodash/fp/groupBy';

import {
  useToolsStore,
  useGroupsStore,
  NewToolDialog,
  NewGroupDialog,
  ToolSearchForm,
  ToolCard,
  ToolId,
  ToolBody,
  GroupName,
  GroupId,
} from 'src/modules/tools';

const $q = useQuasar();

const toolsStore = useToolsStore();

const groupsStore = useGroupsStore();

const { filteredTools } = storeToRefs(toolsStore);

const { groups } = storeToRefs(groupsStore);

const tools = computed(() => groupBy('group.name', filteredTools.value));

const getTools = async () => {
  await toolsStore.getTools();
};

const addTool = async (body: ToolBody) => {
  try {
    await toolsStore.addTool(body);

    $q.notify({
      type: 'positive',
      message: 'Added a new tool',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: (error as Error).message,
    });
  }
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

const getGroups = async () => {
  await groupsStore.getGroups();
};

const addGroup = async (name: GroupName) => {
  try {
    await groupsStore.addGroup(name);

    $q.notify({
      type: 'positive',
      message: 'Group successfully deleted',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: (error as Error).message,
    });
  }
};

const deleteGroup = async (id: GroupId) => {
  try {
    await groupsStore.deleteGroup(id);

    $q.notify({
      type: 'positive',
      message: 'Group successfully deleted',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: (error as Error).message,
    });
  }
};

const getToolsAndGroups = async () => {
  await getTools();
  await getGroups();
};

onMounted(getToolsAndGroups);
</script>
