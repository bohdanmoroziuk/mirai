<template>
  <q-input
    v-model.trim="searchTerm"
    label="Search by name"
    debounce="500"
    outlined
    dense
  >
    <template v-slot:append>
      <q-icon
        v-if="searchTerm"
        name="close"
        class="cursor-pointer"
        @click="resetSearchTerm"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useToolsStore } from 'src/modules/tools';

const toolsStore = useToolsStore();

const searchTerm = computed({
  get() {
    return toolsStore.searchTerm;
  },
  set(value: string) {
    toolsStore.setSearchTerm(value);
  },
});

const resetSearchTerm = () => {
  toolsStore.setSearchTerm('');
};
</script>
