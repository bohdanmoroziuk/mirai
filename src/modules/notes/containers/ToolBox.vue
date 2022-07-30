<template>
  <div class="toolbox row items-center justify-between q-gutter-x-md">
    <div class="toolbox-group row items-center q-gutter-x-sm">
      <q-btn
        color="primary"
        icon="add"
        label="Add note"
        @click="openNoteDialog"
      />
      <q-btn
        color="primary"
        icon="add"
        label="Add topic"
        @click="openTopicDialog"
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
    <div class="toolbox-group">
      <q-btn-dropdown
        color="primary"
        dropdown-icon="settings"
        no-icon-animation
      >
        <div class="q-px-sm">
          <div class="row items-center justify-between no-wrap q-pa-sm">
            <span>View as:</span>
            <div class="q-gutter-sm">
              <q-radio v-model="viewModel" val="list" label="List" />
              <q-radio v-model="viewModel" val="grid" label="Grid" />
            </div>
          </div>
          <q-separator spaced="8px" />
          <div class="row items-center justify-between no-wrap q-pa-sm">
            <span>Sort by:</span>
            <div class="q-gutter-sm">
              <q-radio v-model="sortKeyModel" val="name" label="Name" />
              <q-radio v-model="sortKeyModel" val="createdAt" label="Date" />
            </div>
          </div>
          <div class="row items-center justify-between no-wrap q-pa-sm">
            <span>Sort direction:</span>
            <div class="q-gutter-sm">
              <q-radio v-model="sortDirectionModel" val="asc" label="Asc" />
              <q-radio v-model="sortDirectionModel" val="desc" label="Desc" />
            </div>
          </div>
        </div>
      </q-btn-dropdown>
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

const openNoteDialog = () => {
  notesStore.openDialog();
};

const openTopicDialog = () => {
  notesStore.openTopicDialog();
};
</script>
