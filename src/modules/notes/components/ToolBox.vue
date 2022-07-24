<template>
  <div class="toolbox row items-center justify-between q-gutter-x-md">
    <div class="toolbox-group row items-center q-gutter-x-sm">
      <q-btn
        color="primary"
        icon="add"
        label="Add note"
        @click="openDialog"
      />
    </div>
    <div class="toolbox-group" style="flex: 1;">
      <q-input
        v-model.trim="searchTermModel"
        placeholder="Search"
        debounce="300"
        dense
      />
    </div>
    <div class="toolbox-group flex">
      <div class="q-gutter-sm">
        <q-radio v-model="sortKeyModel" val="name" label="Name" />
        <q-radio v-model="sortKeyModel" val="createdAt" label="Date" />
      </div>
      <div class="q-gutter-sm">
        <q-radio v-model="sortDirectionModel" val="asc" label="Asc" />
        <q-radio v-model="sortDirectionModel" val="desc" label="Desc" />
      </div>
    </div>
    <div class="toolbox-group">
      <div class="q-gutter-sm">
        <q-radio v-model="viewModel" val="list" label="List" />
        <q-radio v-model="viewModel" val="grid" label="Grid" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import {
  View,
  SortKey,
  SortDirection,
  useNotesStore,
} from 'src/modules/notes/stores/notes';

const notesStore = useNotesStore();

const {
  searchTerm,
  view,
  sortKey,
  sortDirection,
} = storeToRefs(notesStore);

const searchTermModel = computed({
  get() {
    return searchTerm.value;
  },
  set(value: string) {
    notesStore.setSearchTerm(value);
  },
});

const viewModel = computed({
  get() {
    return view.value;
  },
  set(value: View) {
    notesStore.setView(value);
  },
});

const sortKeyModel = computed({
  get() {
    return sortKey.value;
  },
  set(value: SortKey) {
    notesStore.setSortKey(value);
  },
});

const sortDirectionModel = computed({
  get() {
    return sortDirection.value;
  },
  set(value: SortDirection) {
    notesStore.setSortDirection(value);
  },
});

const openDialog = () => {
  notesStore.openDialog();
};
</script>
